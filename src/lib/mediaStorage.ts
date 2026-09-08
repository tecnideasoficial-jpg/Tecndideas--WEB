import { ref, uploadBytes, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

export interface ProcessedImageResult {
  blob: Blob;
  dataUrl: string;
  width: number;
  height: number;
  size: number;
}

/**
 * Normalizes text to a clean URL/storage safe slug
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/**
 * Resizes, crops, and optimizes any image to WebP with target width/height
 */
export async function processImageToWebp(
  fileOrUrl: File | Blob | string,
  targetWidth = 800,
  targetHeight = 520,
  quality = 0.85,
  fitMode: 'cover' | 'contain' = 'cover'
): Promise<ProcessedImageResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Canvas context could not be created'));
          return;
        }

        // Fill background
        ctx.fillStyle = '#090d16';
        ctx.fillRect(0, 0, targetWidth, targetHeight);

        if (fitMode === 'contain') {
          // Blurred backdrop from same image
          ctx.filter = 'blur(16px) brightness(0.6)';
          ctx.drawImage(img, -20, -20, targetWidth + 40, targetHeight + 40);
          ctx.filter = 'none';

          // Center contain
          const ratio = Math.min(targetWidth / img.width, targetHeight / img.height);
          const drawW = img.width * ratio;
          const drawH = img.height * ratio;
          const dx = (targetWidth - drawW) / 2;
          const dy = (targetHeight - drawH) / 2;
          ctx.drawImage(img, dx, dy, drawW, drawH);
        } else {
          // Cover crop
          const ratio = Math.max(targetWidth / img.width, targetHeight / img.height);
          const drawW = img.width * ratio;
          const drawH = img.height * ratio;
          const dx = (targetWidth - drawW) / 2;
          const dy = (targetHeight - drawH) / 2;
          ctx.drawImage(img, dx, dy, drawW, drawH);
        }

        // Generate WebP dataUrl with fallback to JPEG if WebP is unsupported
        let dataUrl = canvas.toDataURL('image/webp', quality);
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({
                blob,
                dataUrl,
                width: targetWidth,
                height: targetHeight,
                size: blob.size
              });
            } else {
              // Approximate blob from dataUrl
              const byteString = atob(dataUrl.split(',')[1]);
              const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
              const ab = new ArrayBuffer(byteString.length);
              const ia = new Uint8Array(ab);
              for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
              }
              const fallbackBlob = new Blob([ab], { type: mimeString });
              resolve({
                blob: fallbackBlob,
                dataUrl,
                width: targetWidth,
                height: targetHeight,
                size: fallbackBlob.size
              });
            }
          },
          'image/webp',
          quality
        );
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image for processing'));
    };

    if (typeof fileOrUrl === 'string') {
      img.src = fileOrUrl;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(fileOrUrl);
    }
  });
}

/**
 * Uploads processed media to Firebase Storage with directory:
 * imagenes/[categoria]/[nombre-imagen].webp
 * Falls back to high-res optimized WebP dataUrl if Storage is not provisioned or offline.
 */
export async function uploadMediaToStorage(
  fileOrBlob: File | Blob | string,
  meta: { name: string; category: string; fitMode?: 'cover' | 'contain' }
): Promise<{
  publicUrl: string;
  storagePath: string;
  width: number;
  height: number;
  size: number;
}> {
  // 1. Process and optimize to WebP
  const processed = await processImageToWebp(
    fileOrBlob,
    800,
    520,
    0.85,
    meta.fitMode || 'cover'
  );

  const cleanCategory = slugify(meta.category || 'general');
  const cleanName = slugify(meta.name || 'imagen') || 'imagen';
  const timestamp = Date.now();
  const storagePath = `imagenes/${cleanCategory}/${cleanName}-${timestamp}.webp`;

  // 2. Try Firebase Storage
  try {
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, processed.blob, {
      contentType: 'image/webp',
      customMetadata: {
        originalName: meta.name,
        category: meta.category,
        uploadedAt: new Date().toISOString()
      }
    });

    const publicUrl = await getDownloadURL(storageRef);
    return {
      publicUrl,
      storagePath,
      width: processed.width,
      height: processed.height,
      size: processed.size
    };
  } catch (storageErr) {
    console.warn(
      'Firebase Storage unavailable or requires bucket rules. Using optimized WebP persistence fallback:',
      storageErr
    );

    // Fallback directly to optimized WebP data URL
    return {
      publicUrl: processed.dataUrl,
      storagePath: `local/${storagePath}`,
      width: processed.width,
      height: processed.height,
      size: processed.size
    };
  }
}

/**
 * Deletes media file from Firebase Storage if applicable
 */
export async function deleteMediaFromStorage(storagePath: string): Promise<void> {
  if (!storagePath || storagePath.startsWith('local/') || storagePath.startsWith('http')) {
    return;
  }
  try {
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
  } catch (err) {
    console.warn('Could not delete object from Firebase Storage (may not exist):', err);
  }
}
