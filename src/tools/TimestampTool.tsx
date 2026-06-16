import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export function TimestampTool() {
  const [tsInput, setTsInput] = useState('')
  const [dateInput, setDateInput] = useState('')
  const [tsResult, setTsResult] = useState('')
  const [dateResult, setDateResult] = useState('')
  const [copiedDate, setCopiedDate] = useState(false)

  const tsToDate = () => {
    const ts = parseInt(tsInput)
    if (isNaN(ts)) { setDateResult('无效时间戳'); return }
    const d = new Date(ts < 10000000000 ? ts * 1000 : ts)
    setDateResult(d.toLocaleString('zh-CN', { hour12: false }))
  }

  const dateToTs = () => {
    const d = new Date(dateInput)
    if (isNaN(d.getTime())) { setTsResult('无效日期'); return }
    setTsResult(`${Math.floor(d.getTime() / 1000)} (秒)\n${d.getTime()} (毫秒)`)
  }

  const now = () => {
    setTsInput(String(Math.floor(Date.now() / 1000)))
    tsToDate()
  }

  return (
    <div className="space-y-6">
      {/* Timestamp → Date */}
      <div className="p-5 rounded-xl bg-slate-800/30 border border-slate-700/50">
        <h3 className="text-white font-semibold mb-3">时间戳 → 日期</h3>
        <div className="flex gap-3 mb-3">
          <input
            value={tsInput}
            onChange={e => setTsInput(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-300 font-mono focus:outline-none focus:border-blue-500"
            placeholder="输入时间戳，如 1718505600"
          />
          <button onClick={tsToDate} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors">转换</button>
          <button onClick={now} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors">当前</button>
        </div>
        <div className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded-lg px-4 py-3">
          <span className="text-slate-300 font-mono text-sm">{dateResult || '-'}</span>
          {dateResult && dateResult !== '-' && (
            <button onClick={() => { navigator.clipboard.writeText(dateResult); setCopiedDate(true); setTimeout(() => setCopiedDate(false), 1500) }} className="text-slate-400 hover:text-white">
              {copiedDate ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Date → Timestamp */}
      <div className="p-5 rounded-xl bg-slate-800/30 border border-slate-700/50">
        <h3 className="text-white font-semibold mb-3">日期 → 时间戳</h3>
        <div className="flex gap-3 mb-3">
          <input
            type="datetime-local"
            value={dateInput}
            onChange={e => setDateInput(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-blue-500"
          />
          <button onClick={dateToTs} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors">转换</button>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3">
          <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap">{tsResult || '-'}</pre>
        </div>
      </div>
    </div>
  )
}
