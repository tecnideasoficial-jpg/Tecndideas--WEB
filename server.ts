import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client lazily / safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY || '';
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// System instruction for Tecnideas AI Assistant
const TECNIDEAS_SYSTEM_PROMPT = `
Eres el "Agente IA Tecnideas", el asistente virtual inteligente de la empresa Tecnideas ubicada en Medellín, Colombia.
Tecnideas tiene más de 29 años de trayectoria en Medellín. Nació en 1997 como centro de copiado e impresiones y ha evolucionado a un Centro Integral de Soluciones Tecnológicas, Ecosistema Digital, Workspace y Centro de Capacitación.

Tus conocimientos clave:
1. SERVICIOS DIGITALES:
   - Diseño Web Premium (Desde $999.000 COP) - Diseños inspirados en Apple/Stripe/Vercel.
   - Tiendas Virtuales (Desde $1.850.000 COP) - Wompi, PayU, MercadoPago.
   - Agentes de IA en WhatsApp y Automatización (Desde $1.200.000 COP) - Atención 24/7.
   - CRM y Funnels de Ventas ($850.000 COP).
   - SEO y Marketing Digital ($650.000 COP/mes).
   - Desarrollo de Software & Apps ($3.500.000 COP).
   - Hosting, Dominios y Correos Corporativos.

2. SERVICIOS TRADICIONALES:
   - Fotocopias e Impresiones Digitales de alta velocidad (Blanco/Negro y Color).
   - Papelería corporativa, argollado, plastificado, escaneo masivo con OCR.
   - Asesoría y citas para Pasaportes (Gobernación de Antioquia), Formulario DS-160 para Visas, SOAT digital, RUNT.

3. TECNIDEAS WORKSPACE & CAPACITACIÓN:
   - Coworking flexible en Medellín por horas ($8.000/h) o día ($35.000/día) o mes ($320.000/mes).
   - Sala de Juntas ejecutiva con pantalla smart y videollamadas.
   - Auditorio / Aula de capacitación hasta 30 personas.
   - Cursos presenciales y virtuales sobre Inteligencia Artificial para Pymes, Automatización de WhatsApp, y WordPress.

Tono de comunicación:
- Profesional, amable, servicial, innovador y muy paisa/colombiano amable y respetuoso.
- Siempre invita al usuario a agendar una cita, dejar su contacto o hacer clic en "Solicitar Cotización por WhatsApp" (+57 302 417 1818).
- Sé conciso, claro y directo. Responde en español.
`;

// API Route: AI Assistant Chat Endpoint
app.post('/api/ai-chat', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'El mensaje es requerido.' });
    }

    const ai = getGeminiClient();
    
    // Construct context
    const prompt = `Historial previo: ${JSON.stringify(conversationHistory || [])}\nPregunta del cliente: ${message}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: TECNIDEAS_SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Hola, soy el Agente Tecnideas IA. ¿En qué puedo ayudarte hoy en tu negocio o trámite?';
    return res.json({ reply });
  } catch (err: any) {
    console.error('Error in AI Chat endpoint:', err);
    return res.status(500).json({
      reply: '¡Hola! En este momento estoy experimentando una breve pausa de red. Sin embargo, puedes comunicarte directamente con nuestro equipo de Tecnideas por WhatsApp al +57 300 912 8472.',
    });
  }
});

// API Route: Intelligent Solution Quote Analysis
app.post('/api/calculate-quote', async (req, res) => {
  try {
    const { selectedServices, businessType, timeframe, budgetTarget } = req.body;

    const ai = getGeminiClient();
    const prompt = `Analiza la siguiente solicitud de cotización para Tecnideas Medellín:
    - Tipo de Negocio/Cliente: ${businessType}
    - Servicios seleccionados: ${JSON.stringify(selectedServices)}
    - Plazo deseado: ${timeframe}
    - Presupuesto aproximado indicado: ${budgetTarget}

    Por favor genera un análisis amigable en JSON con el siguiente formato estricto:
    {
      "summary": "Resumen ejecutivo del proyecto y valor que aportará",
      "recommendedStack": ["Tecnología 1", "Tecnología 2", "Tecnología 3"],
      "estimatedTimeline": "Ej: 7 a 12 días hábiles",
      "estimatedCostCOP": 1500000,
      "keyBenefits": ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
      "nextSteps": "Paso recomendado para iniciar hoy"
    }`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    let result = {};
    try {
      result = JSON.parse(response.text || '{}');
    } catch {
      result = {
        summary: 'Propuesta adaptada a la transformación digital de tu negocio.',
        recommendedStack: ['Next.js', 'React', 'WhatsApp AI'],
        estimatedTimeline: '8 a 12 días hábiles',
        estimatedCostCOP: 1200000,
        keyBenefits: ['Soporte local en Medellín', 'Carga ultrarrápida', 'Integración CRM'],
        nextSteps: 'Habla con un consultor senior de Tecnideas por WhatsApp.',
      };
    }

    return res.json({ analysis: result });
  } catch (err: any) {
    console.error('Error in quote calculation endpoint:', err);
    return res.status(500).json({
      analysis: {
        summary: 'Propuesta estándar de aceleración digital Tecnideas.',
        recommendedStack: ['React', 'WhatsApp API', 'CMS'],
        estimatedTimeline: '7 a 10 días hábiles',
        estimatedCostCOP: 999000,
        keyBenefits: ['Acompañamiento personalizado 29+ años', 'Garantía total'],
        nextSteps: 'Contáctanos por WhatsApp al +57 302 417 1818.',
      },
    });
  }
});

// Start Express and Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Tecnideas Digital Ecosystem running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
