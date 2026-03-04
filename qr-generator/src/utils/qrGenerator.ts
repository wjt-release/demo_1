import QRCode from 'qrcode';

export interface QRCodeOptions {
  width?: number;
  margin?: number;
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  color?: {
    dark?: string;
    light?: string;
  };
}

const defaultOptions: QRCodeOptions = {
  width: 256,
  margin: 2,
  errorCorrectionLevel: 'H',
  color: {
    dark: '#000000',
    light: '#ffffff',
  },
};

export async function generateQRCode(
  text: string,
  options?: QRCodeOptions
): Promise<string> {
  if (!text || text.trim() === '') {
    return '';
  }

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    color: {
      ...defaultOptions.color,
      ...options?.color,
    },
  };

  try {
    const dataUrl = await QRCode.toDataURL(text, mergedOptions);
    return dataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
}
