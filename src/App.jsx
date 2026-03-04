import { useState, useEffect, useCallback, useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import debounce from 'lodash.debounce'

function App() {
  const [input, setInput] = useState('')
  const [qrValue, setQrValue] = useState('')
  const qrRef = useRef(null)

  // Debounced update function
  const debouncedSetQrValue = useCallback(
    debounce((value) => {
      setQrValue(value)
    }, 500),
    []
  )

  const handleInputChange = (e) => {
    const value = e.target.value
    setInput(value)
    debouncedSetQrValue(value)
  }

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector('canvas')
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream")
      let downloadLink = document.createElement("a")
      downloadLink.href = pngUrl
      downloadLink.download = "qrcode.png"
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans text-slate-900">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">
          极简二维码生成
        </h1>
        <p className="text-slate-500">粘贴网址或文本，即时生成二维码</p>
      </header>

      <main className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 md:p-12 transition-all">
        <div className="space-y-8">
          {/* Input Section */}
          <div className="space-y-4">
            <label htmlFor="input" className="block text-sm font-medium text-slate-700 ml-1">
              输入内容
            </label>
            <textarea
              id="input"
              rows="4"
              className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all text-lg resize-none placeholder:text-slate-400"
              placeholder="粘贴你的网址或文本链接..."
              value={input}
              onChange={handleInputChange}
              autoFocus
            />
          </div>

          {/* QR Display Section */}
          <div className="flex flex-col items-center justify-center pt-4">
            <div 
              ref={qrRef}
              className={`p-6 bg-white rounded-2xl border-2 border-slate-100 shadow-sm transition-all duration-500 ${
                qrValue ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              {qrValue && (
                <QRCodeCanvas
                  value={qrValue}
                  size={256}
                  level="H"
                  includeMargin={false}
                  className="mx-auto"
                />
              )}
            </div>

            {qrValue && (
              <div className="mt-8 flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <button
                  onClick={downloadQRCode}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 12L12 16.5m0 0L16.5 12M12 16.5V3" />
                  </svg>
                  下载 PNG 图片
                </button>
                <p className="text-sm text-slate-400">或者直接右键点击二维码保存</p>
              </div>
            )}

            {!qrValue && input && (
              <div className="mt-8 text-slate-400 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                正在生成...
              </div>
            )}
            
            {!input && (
              <div className="mt-8 text-slate-300 italic">
                等待输入...
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-12 text-slate-400 text-sm">
        <p>100% 隐私安全 · 纯浏览器端生成 · 无需登录</p>
      </footer>
    </div>
  )
}

export default App
