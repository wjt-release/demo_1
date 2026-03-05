import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { useDebounce } from '@/hooks/useDebounce';
import { QrCode, Download } from 'lucide-react';

export default function QRCodeGenerator() {
  const [inputText, setInputText] = useState<string>('');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const debouncedInput = useDebounce(inputText, 1000);

  useEffect(() => {
    if (debouncedInput.trim()) {
      generateQRCode(debouncedInput);
    } else {
      setQrCodeUrl('');
    }
  }, [debouncedInput]);

  const generateQRCode = async (text: string) => {
    setIsGenerating(true);
    try {
      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, text, {
          width: 300,
          margin: 2,
          color: {
            dark: '#1a1a1a',
            light: '#ffffff',
          },
          errorCorrectionLevel: 'M',
        });
        
        const url = canvasRef.current.toDataURL('image/png');
        setQrCodeUrl(url);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = qrCodeUrl;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-6 shadow-lg shadow-indigo-500/30">
            <QrCode className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
            QR Code Generator
          </h1>
          <p className="text-gray-500 text-lg">
            粘贴网址或文本，即时生成二维码
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 md:p-10">
          <div className="mb-8">
            <label 
              htmlFor="qr-input" 
              className="block text-sm font-medium text-gray-700 mb-3"
            >
              输入内容
            </label>
            <textarea
              id="qr-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="粘贴你的网址或文本链接..."
              className="w-full h-32 px-5 py-4 text-base text-gray-900 placeholder-gray-400 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-200 resize-none"
            />
            {inputText && (
              <p className="mt-2 text-sm text-gray-400">
                {isGenerating ? '生成中...' : '停止输入1秒后自动生成'}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center">
            {(qrCodeUrl || isGenerating) && (
              <div className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <canvas 
                    ref={canvasRef}
                    className="block mx-auto"
                    style={{ display: qrCodeUrl ? 'block' : 'none' }}
                  />
                  {isGenerating && !qrCodeUrl && (
                    <div className="w-[300px] h-[300px] flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
                
                {qrCodeUrl && (
                  <button
                    onClick={handleDownload}
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-200 active:scale-95"
                  >
                    <Download className="w-5 h-5" />
                    下载二维码
                  </button>
                )}
              </div>
            )}

            {!qrCodeUrl && !isGenerating && (
              <div className="w-full h-[300px] flex flex-col items-center justify-center text-gray-300">
                <div className="w-32 h-32 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center mb-4">
                  <QrCode className="w-16 h-16 text-gray-200" />
                </div>
                <p className="text-gray-400 text-sm">
                  二维码将在此显示
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            无需注册 · 无需登录 · 完全免费
          </p>
        </div>
      </div>
    </div>
  );
}
