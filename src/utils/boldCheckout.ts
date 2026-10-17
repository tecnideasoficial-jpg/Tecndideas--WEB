/**
 * Integración Oficial con Pasarela de Pagos Bold Colombia (checkout.bold.co)
 * Llaves de Producción y Generación Segura de Firma de Integridad SHA-256
 */

export const BOLD_CONFIG = {
  identityKey: 'vuIkBV88ZJJ-Qvhcx8AEQbWSwPhDe_2ZkBrofsUtQT4',
  secretKey: 'Eawu4bIZsZkothY2iytWkg',
  scriptUrl: 'https://checkout.bold.co/library/boldPaymentButton.js',
  currency: 'COP',
  renderMode: 'embedded' as const
};

export interface BoldPaymentParams {
  orderId?: string;
  amount: number;
  currency?: string;
  description: string;
  redirectionUrl?: string;
  tax?: number;
}

/**
 * Carga dinámica del SDK de Bold si aún no está presente en el DOM
 */
export async function loadBoldScript(): Promise<void> {
  if (typeof window === 'undefined') return;

  if ((window as any).BoldCheckout) {
    return;
  }

  return new Promise((resolve, reject) => {
    // Check if script element already exists
    const existing = document.querySelector(`script[src="${BOLD_CONFIG.scriptUrl}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', (e) => reject(e));
      // In case it was already loaded
      setTimeout(() => resolve(), 300);
      return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = BOLD_CONFIG.scriptUrl;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.head.appendChild(script);
  });
}

/**
 * Genera el hash de integridad SHA-256 requerido por Bold:
 * SHA256(orderId + amount + currency + secretKey)
 * 
 * Primero intenta consultar el backend seguro (/api/bold/hash);
 * si no está disponible, utiliza Web Crypto API en el navegador como respaldo inmediato.
 */
export async function generateBoldIntegrityHash(
  orderId: string,
  amount: number,
  currency: string = 'COP'
): Promise<string> {
  const cleanAmount = String(Math.round(amount));
  const cleanCurrency = currency.trim().toUpperCase();
  const cleanOrderId = orderId.trim();

  // 1. Intento por endpoint seguro en Backend
  try {
    const res = await fetch('/api/bold/hash', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: cleanOrderId,
        amount: cleanAmount,
        currency: cleanCurrency
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.integritySignature) {
        return data.integritySignature;
      }
    }
  } catch (err) {
    console.warn('Fallback al cálculo local de firma de integridad Bold:', err);
  }

  // 2. Respaldo frontend con Web Cryptography API
  const concatenated = `${cleanOrderId}${cleanAmount}${cleanCurrency}${BOLD_CONFIG.secretKey}`;
  const msgBuffer = new TextEncoder().encode(concatenated);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Inicia el checkout oficial de Bold abriendo el modal integrado (embedded)
 */
export async function openBoldCheckout(params: BoldPaymentParams): Promise<{ success: boolean; orderId: string }> {
  try {
    await loadBoldScript();

    const orderId = params.orderId || `TEC-${Date.now()}`;
    const cleanAmount = String(Math.round(params.amount));
    const currency = params.currency || BOLD_CONFIG.currency;
    const redirectionUrl = params.redirectionUrl || `${window.location.origin}/?payment=bold_success&orderId=${orderId}`;

    const integritySignature = await generateBoldIntegrityHash(orderId, params.amount, currency);

    const config = {
      orderId,
      currency,
      amount: cleanAmount,
      apiKey: BOLD_CONFIG.identityKey,
      integritySignature,
      description: params.description.slice(0, 100),
      redirectionUrl,
      renderMode: 'embedded'
    };

    if (typeof (window as any).BoldCheckout === 'function') {
      const checkout = new (window as any).BoldCheckout(config);
      checkout.open();
      return { success: true, orderId };
    } else {
      // Fallback if class not attached to window directly yet
      console.warn('BoldCheckout class not yet ready on window, waiting 500ms...');
      await new Promise(r => setTimeout(r, 500));
      if (typeof (window as any).BoldCheckout === 'function') {
        const checkout = new (window as any).BoldCheckout(config);
        checkout.open();
        return { success: true, orderId };
      }
      throw new Error('No se pudo inicializar la librería de pagos Bold.');
    }
  } catch (error) {
    console.error('Error al abrir checkout de Bold:', error);
    throw error;
  }
}
