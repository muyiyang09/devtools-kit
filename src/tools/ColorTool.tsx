import { useState, useMemo } from 'react'
import { Copy, Check } from 'lucide-react'

export function ColorTool() {
  const [hex, setHex] = useState('#3b82f6')
  const [copied, setCopied] = useState('')

  const hexToRgb = (h: string) => {
    const r = parseInt(h.slice(1, 3), 16)
    const g = parseInt(h.slice(3, 5), 16)
    const b = parseInt(h.slice(5, 7), 16)
    return { r, g, b }
  }

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s = 0, l = (max + min) / 2
    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      h = max === r ? ((g - b) / d + (g < b ? 6 : 0)) : max === g ? ((b - r) / d + 2) : ((r - g) / d + 4)
      h *= 60
    }
    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) }
  }

  const colorData = useMemo(() => {
    try {
      const { r, g, b } = hexToRgb(hex)
      const { h, s: sl, l } = rgbToHsl(r, g, b)
      return { hex, rgb: `rgb(${r}, ${g}, ${b})`, hsl: `hsl(${h}, ${sl}%, ${l}%)` }
    } catch {
      return { hex: '#000000', rgb: 'rgb(0, 0, 0)', hsl: 'hsl(0, 0%, 0%)' }
    }
  }, [hex])

  const copy = (val: string, label: string) => {
    navigator.clipboard.writeText(val)
    setCopied(label)
    setTimeout(() => setCopied(''), 1500)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl border border-slate-700" style={{ backgroundColor: hex }} />
        <div>
          <label className="text-xs text-slate-500 block mb-1">HEX 颜色</label>
          <input
            value={hex}
            onChange={e => setHex(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-300 font-mono w-36 focus:outline-none focus:border-blue-500"
            placeholder="#000000"
          />
          <input type="color" value={hex} onChange={e => setHex(e.target.value)} className="ml-2 w-10 h-10 rounded cursor-pointer border-0 bg-transparent" />
        </div>
      </div>

      <div className="space-y-2">
        {[
          { label: 'HEX', value: colorData.hex },
          { label: 'RGB', value: colorData.rgb },
          { label: 'HSL', value: colorData.hsl },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded-lg px-4 py-3">
            <span className="text-xs text-slate-500 w-10">{label}</span>
            <code className="text-sm text-slate-300 font-mono">{value}</code>
            <button onClick={() => copy(value, label)} className="text-slate-400 hover:text-white">
              {copied === label ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
