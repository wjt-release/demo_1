import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Scan, Link2, Download } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 1000);
  const [isFocused, setIsFocused] = useState(false);

  const handleDownload = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = 480;
      canvas.height = 480;
      ctx!.fillStyle = "#ffffff";
      ctx!.fillRect(0, 0, canvas.width, canvas.height);
      ctx!.drawImage(img, 0, 0, 480, 480);

      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "qrcode.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            <span className="text-gradient">QR</span>
            <span className="text-white"> Generator</span>
          </h1>
          <p className="text-brand-muted text-sm sm:text-base">
            粘贴网址或文本，即时生成二维码
          </p>
        </header>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          <div className="w-full lg:w-auto flex-shrink-0">
            <div
              className={`relative bg-brand-card rounded-2xl border transition-all duration-300 ${
                isFocused
                  ? "border-brand-primary shadow-[0_0_30px_rgba(0,217,165,0.15)]"
                  : "border-brand-border"
              }`}
            >
              <div className="absolute -top-3 left-4 px-2 bg-brand-dark text-xs text-brand-muted">
                输入内容
              </div>
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="粘贴你的网址或文本链接..."
                className="w-80 sm:w-96 h-40 p-5 bg-transparent text-white resize-none rounded-2xl placeholder:text-brand-muted/60"
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2 text-brand-muted text-xs">
                <Link2 className="w-3 h-3" />
                <span>支持 HTTP/HTTPS 及纯文本</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            {debouncedValue ? (
              <div className="animate-fade-in flex flex-col items-center">
                <div className="bg-white p-5 rounded-2xl shadow-2xl shadow-brand-primary/10 animate-pulse-glow">
                  <QRCodeSVG
                    id="qr-code-svg"
                    value={debouncedValue}
                    size={240}
                    level="H"
                    includeMargin={false}
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                </div>
                <p className="text-brand-muted text-xs mt-4 text-center">
                  右键点击图片保存
                </p>
                <button
                  onClick={handleDownload}
                  className="mt-3 flex items-center gap-2 px-5 py-2.5 text-sm text-brand-primary border border-brand-primary/30 rounded-xl hover:bg-brand-primary/10 transition-colors duration-200"
                >
                  <Download className="w-4 h-4" />
                  下载 PNG
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-64 h-64 sm:w-72 sm:h-72 bg-brand-card rounded-2xl border border-brand-border">
                <Scan className="w-16 h-16 text-brand-muted mb-4" strokeWidth={1} />
                <p className="text-brand-muted text-sm text-center px-6">
                  输入内容后自动生成二维码
                </p>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-16 text-center">
          <p className="text-brand-muted/60 text-xs">
            无需注册 · 无需登录 · 纯前端处理 · 数据不上传
          </p>
        </footer>
      </div>
    </div>
  );
}
