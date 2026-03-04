import { useState, useEffect, useCallback } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { generateQRCode } from '../../utils/qrGenerator';
import styles from './styles.module.css';

interface QRGeneratorProps {
  debounceMs?: number;
  qrSize?: number;
}

function QRGenerator({ debounceMs = 1000, qrSize = 256 }: QRGeneratorProps) {
  const [inputText, setInputText] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedText = useDebounce(inputText, debounceMs);

  const generateQR = useCallback(async (text: string) => {
    if (!text.trim()) {
      setQrDataUrl(null);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const dataUrl = await generateQRCode(text, { width: qrSize });
      setQrDataUrl(dataUrl);
    } catch {
      setError('生成二维码失败，请重试');
      setQrDataUrl(null);
    } finally {
      setIsLoading(false);
    }
  }, [qrSize]);

  useEffect(() => {
    generateQR(debouncedText);
  }, [debouncedText, generateQR]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputSection}>
        <textarea
          className={styles.input}
          value={inputText}
          onChange={handleInputChange}
          placeholder="粘贴你的网址或文本链接"
          rows={6}
          autoFocus
        />
        {isLoading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <span>生成中...</span>
          </div>
        )}
      </div>

      <div className={styles.outputSection}>
        {qrDataUrl ? (
          <div className={styles.qrWrapper}>
            <img
              src={qrDataUrl}
              alt="QR Code"
              className={styles.qrImage}
            />
            <p className={styles.hint}>右键保存图片</p>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <div className={styles.placeholderIcon}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="3" height="3" />
                <rect x="18" y="14" width="3" height="3" />
                <rect x="14" y="18" width="3" height="3" />
                <rect x="18" y="18" width="3" height="3" />
              </svg>
            </div>
            <p className={styles.placeholderText}>输入内容后自动生成二维码</p>
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

export default QRGenerator;
