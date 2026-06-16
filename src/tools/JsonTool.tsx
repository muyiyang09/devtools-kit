import { useState, useCallback } from 'react'
import { Copy, Check, AlertCircle } from 'lucide-react'

export function JsonTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState(2)
  const [copied, setCopied] = useState(false)

  const format = useCallback(() => {
    try {
      const obj = JSON.parse(input)
      setOutput(JSON.stringify(obj, null, indent))
      setError('')
    } catch (e: any) {
      setError(e.message)
      setOutput('')
    }
  }, [input, indent])

  const compress = useCallback(() => {
    try {
      const obj = JSON.parse(input)
      setOutput(JSON.stringify(obj))
      setError('')
    } catch (e: any) {
      setError(e.message)
      setOutput('')
    }
  }, [input])

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={format} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">格式化</button>
        <button onClick={compress} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">压缩</button>
        <select value={indent} onChange={e => setIndent(Number(e.target.value))} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300">
          <option value={2}>2 空格</option>
          <option value={4}>4 空格</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-slate-500 mb-1 block">输入</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full h-80 bg-slate-900 border border-slate-700 rounded-lg p-4 text-sm text-slate-300 font-mono resize-none focus:outline-none focus:border-blue-500"
            placeholder='{"key": "value"}'
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

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}
    </div>
  )
}
