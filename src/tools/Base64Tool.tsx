import { useState, useCallback } from 'react'
import { Copy, Check, ArrowDownUp } from 'lucide-react'

export function Base64Tool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [copied, setCopied] = useState(false)

  const convert = useCallback(() => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))))
      } else {
        setOutput(decodeURIComponent(escape(atob(input))))
      }
    } catch {
      setOutput('解码失败，请检查输入')
    }
  }, [input, mode])

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const toggleMode = () => {
    setMode(m => m === 'encode' ? 'decode' : 'encode')
    setInput('')
    setOutput('')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={convert} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
          {mode === 'encode' ? '编码' : '解码'}
        </button>
        <button onClick={toggleMode} className="flex items-center gap-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors">
          <ArrowDownUp className="w-4 h-4" /> 切换
        </button>
        <span className="text-sm text-slate-500">当前模式：{mode === 'encode' ? '编码 (→ Base64)' : '解码 (Base64 →)'}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-slate-500 mb-1 block">输入</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full h-80 bg-slate-900 border border-slate-700 rounded-lg p-4 text-sm text-slate-300 font-mono resize-none focus:outline-none focus:border-blue-500"
            placeholder={mode === 'encode' ? '输入要编码的文本...' : '输入 Base64 字符串...'}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-slate-500">输出</label>
            {output && (
              <button onClick={copy} className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors">
                {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                {copied ? '已复制' : '复制'}
              </button>
            )}
          </div>
          <textarea
            readOnly
            value={output}
            className="w-full h-80 bg-slate-900 border border-slate-700 rounded-lg p-4 text-sm text-slate-300 font-mono resize-none focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}
