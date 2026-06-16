import { useState } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

export function UuidTool() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(5)
  const [upper, setUpper] = useState(false)
  const [noDash, setNoDash] = useState(false)
  const [copied, setCopied] = useState(false)

  const generate = () => {
    const list = Array.from({ length: count }, () => {
      let u = generateUUID()
      if (upper) u = u.toUpperCase()
      if (noDash) u = u.replace(/-/g, '')
      return u
    })
    setUuids(list)
  }

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm text-slate-400">生成数量:</span>
        <input type="number" min={1} max={100} value={count} onChange={e => setCount(Number(e.target.value))} className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-blue-500" />
        <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
          <input type="checkbox" checked={upper} onChange={e => setUpper(e.target.checked)} className="rounded" />大写
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
          <input type="checkbox" checked={noDash} onChange={e => setNoDash(e.target.checked)} className="rounded" />去掉连字符
        </label>
        <button onClick={generate} className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors">
          <RefreshCw className="w-4 h-4" /> 生成
        </button>
      </div>

      {uuids.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">{uuids.length} 个 UUID</span>
            <button onClick={copyAll} className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors">
              {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
              {copied ? '已复制全部' : '复制全部'}
            </button>
          </div>
          {uuids.map((u, i) => (
            <div key={i} className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5">
              <code className="text-sm text-slate-300 font-mono">{u}</code>
              <button onClick={() => { navigator.clipboard.writeText(u) }} className="text-slate-500 hover:text-white">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
