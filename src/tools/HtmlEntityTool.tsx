import { useState, useCallback } from 'react'
import { Copy, Check, ArrowDownUp } from 'lucide-react'

const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const reverseEntities: Record<string, string> = Object.fromEntries(Object.entries(entities).map(([k, v]) => [v, k]))

export function HtmlEntityTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [copied, setCopied] = useState(false)

  const convert = useCallback(() => {
    if (mode === 'encode') {
      setOutput(input.replace(/[&<>"']/g, c => entities[c] || c))
    } else {
      setOutput(input.replace(/&[#a-z0-9]+;/gi, m => reverseEntities[m] || m))
    }
  }, [input, mode])

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={convert} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
          {mode === 'encode' ? '编码' : '解码'}
        </button>
        <button onClick={() => { setMode(m => m === 'encode' ? 'decode' : 'encode'); setInput(''); setOutput('') }} className="flex items-center gap-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors">
          <ArrowDownUp className="w-4 h-4" /> 切换
        </button>
        <span className="text-sm text-slate-500">当前：{mode === 'encode' ? '编码' : '解码'}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-slate-500 mb-1 block">输入</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full h-80 bg-slate-900 border border-slate-700 rounded-lg p-4 text-sm text-slate-300 font-mono resize-none focus:outline-none focus:border-blue-500"
            placeholder={mode === 'encode' ? '<div class="test">Hello</div>' : '&lt;div&gt;Hello&lt;/div&gt;'}
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
