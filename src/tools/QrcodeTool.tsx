import { useState, useCallback } from 'react'
import { Download } from 'lucide-react'
import QRCodeLib from 'qrcode'

export function QrcodeTool() {
  const [text, setText] = useState('')
  const [qrDataUrl, setQrDataUrl] = useState('')

  const generate = useCallback(async () => {
    if (!text.trim()) return
    try {
      const url = await QRCodeLib.toDataURL(text, { width: 300, margin: 2, color: { dark: '#e2e8f0', light: '#0f172a' } })
      setQrDataUrl(url)
    } catch {
      setQrDataUrl('')
    }
  }, [text])

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && generate()}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-blue-500"
          placeholder="输入文本或链接..."
        />
        <button onClick={generate} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">生成</button>
      </div>

      {qrDataUrl && (
        <div className="flex flex-col items-center gap-4 p-8 rounded-xl bg-slate-800/30 border border-slate-700/50">
          <img src={qrDataUrl} alt="QR Code" className="rounded-lg" />
          <a
            href={qrDataUrl}
            download="qrcode.png"
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors"
          >
            <Download className="w-4 h-4" /> 下载 PNG
          </a>
        </div>
      )}
    </div>
  )
}
