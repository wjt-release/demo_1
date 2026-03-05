import { useState, useEffect, useRef, useCallback } from 'react';
import QRCode from 'qrcode';
import { QrCode, Link2, Type, Download } from 'lucide-react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const generateQRCode = useCallback(async (text: string) => {
    if (!text.trim()) {
      setQrDataUrl(null);
      return;
    }

    setIsGenerating(true);
    try {
      const dataUrl = await QRCode.toDataURL(text, {
        width: 256,
        margin: 2,
        color: {
          dark: '#ffffff',
          light: '#0a0a0f',
        },
        errorCorrectionLevel: 'M',
      });
      setQrDataUrl(dataUrl);
    } catch (err) {
      console.error('QR Code generation failed:', err);
      setQrDataUrl(null);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      generateQRCode(inputValue);
    }, 1000);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [inputValue, generateQRCode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrDataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-50"></div>
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent"></div>
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative">
                <QrCode className="w-16 h-16 text-primary" strokeWidth={1.5} />
                <div className="absolute inset-0 blur-xl bg-primary/30 rounded-full"></div>
              </div>
            </div>
            <h1 className="font-mono text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              <span className="text-gradient">QR Code</span>
              <span className="text-white/90"> Generator</span>
            </h1>
            <p className="text-white/50 text-lg font-light">
              极简二维码生成器 · 无需注册 · 即时生成
            </p>
          </div>

          <div className="bg-dark-card/50 backdrop-blur-xl rounded-2xl p-8 border border-dark-border glow-border">
            <div className="relative mb-8">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                {inputValue.startsWith('http') ? (
                  <Link2 className="w-5 h-5" />
                ) : (
                  <Type className="w-5 h-5" />
                )}
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="粘贴你的网址或文本链接"
                className={`w-full bg-dark-lighter/80 text-white text-lg py-5 pl-12 pr-6 rounded-xl border-2 transition-all duration-300 font-sans ${
                  isFocused 
                    ? 'border-primary/50 glow-border-focus' 
                    : 'border-dark-border hover:border-dark-border/80'
                }`}
              />
              {isGenerating && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center">
              {qrDataUrl ? (
                <div className="animate-fade-in">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent-blue/20 to-primary/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                    <div className="relative bg-dark-card p-6 rounded-2xl border border-dark-border">
                      <img
                        src={qrDataUrl}
                        alt="Generated QR Code"
                        className="w-64 h-64 rounded-lg"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
                    <p className="text-white/40 text-sm font-mono">
                      右键图片即可保存
                    </p>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all duration-300 border border-primary/30 hover:border-primary/50 font-medium"
                    >
                      <Download className="w-4 h-4" />
                      下载二维码
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-64 h-64 rounded-2xl border-2 border-dashed border-dark-border flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="w-16 h-16 text-dark-border mx-auto mb-4" strokeWidth={1} />
                    <p className="text-white/30 text-sm">
                      {inputValue ? '正在生成...' : '输入内容后生成二维码'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-6 text-white/30 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                支持 HTTP/HTTPS 链接
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse"></span>
                支持纯文本内容
              </span>
            </div>
          </div>
        </div>

        <footer className="absolute bottom-6 left-0 right-0 text-center">
          <p className="text-white/20 text-xs font-mono">
            纯前端生成 · 数据不离开你的浏览器
          </p>
        </footer>
      </div>
    </div>
  );
}
