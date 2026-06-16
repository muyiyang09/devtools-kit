import { useState, useRef } from 'react'
import { Upload, Download } from 'lucide-react'

export function ImageTool() {
  const [original, setOriginal] = useState<{ file: File; url: string; size: number } | null>(null)
  const [compressed, setCompressed] = useState<string | null>(null)
  const [compressedSize, setCompressedSize] = useState(0)
  const [quality, setQuality] = useState(80)
  const [processing, setProcessing] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setOriginal({ file, url: URL.createObjectURL(file), size: file.size })
    setCompressed(null)
  }

  const compress = () => {
    if (!original) return
    setProcessing(true)
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current!
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      canvas.toBlob(blob => {
        if (blob) {
          setCompressed(URL.createObjectURL(blob))
          setCompressedSize(blob.size)
        }
        setProcessing(false)
      }, original.file.type, quality / 100)
    }
    img.src = original.url
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} className="hidden" />

      {!original ? (
        <label className="flex flex-col items-center gap-4 p-12 rounded-xl border-2 border-dashed border-slate-700 hover:border-slate-500 cursor-pointer transition-colors">
          <Upload className="w-10 h-10 text-slate-500" />
          <span className="text-slate-400">点击或拖拽上传图片</span>
          <span className="text-xs text-slate-600">支持 PNG / JPEG / WebP</span>
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400">压缩质量:</span>
            <input type="range" min="10" max="100" value={quality} onChange={e => setQuality(Number(e.target.value))} className="w-40" />
            <span className="text-sm text-slate-300">{quality}%</span>
          </div>
          <button onClick={compress} disabled={processing} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
            {processing ? '压缩中...' : '开始压缩'}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-500 mb-1">原图 ({formatSize(original.size)})</p>
              <img src={original.url} alt="original" className="max-h-64 rounded-lg border border-slate-700" />
            </div>
            {compressed && (
              <div>
                <p className="text-xs text-green-400 mb-1">
                  压缩后 ({formatSize(compressedSize)}) — 减少 {((1 - compressedSize / original.size) * 100).toFixed(1)}%
                </p>
                <img src={compressed} alt="compressed" className="max-h-64 rounded-lg border border-slate-700" />
                <a href={compressed} download="compressed" className="inline-flex items-center gap-1 mt-2 text-sm text-blue-400 hover:underline">
                  <Download className="w-4 h-4" /> 下载
                </a>
              </div>
            )}
          </div>

          <button onClick={() => { setOriginal(null); setCompressed(null) }} className="text-sm text-slate-500 hover:text-red-400 transition-colors">清除并重新上传</button>
        </div>
      )}
    </div>
  )
}
