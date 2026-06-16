import { useState, useMemo } from 'react'
import { ArrowLeftRight } from 'lucide-react'

function diffLines(a: string, b: string) {
  const aLines = a.split('\n')
  const bLines = b.split('\n')
  const maxLen = Math.max(aLines.length, bLines.length)
  const result: { left: string; right: string; same: boolean }[] = []

  for (let i = 0; i < maxLen; i++) {
    const la = aLines[i] ?? ''
    const lb = bLines[i] ?? ''
    result.push({ left: la, right: lb, same: la === lb })
  }
  return result
}

export function DiffTool() {
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')

  const lines = useMemo(() => diffLines(left, right), [left, right])
  const hasContent = left || right

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <ArrowLeftRight className="w-4 h-4" /> 左右粘贴文本进行对比
      </div>

      {hasContent && (
        <div className="border border-slate-700 rounded-lg overflow-hidden">
          {lines.map((line, i) => (
            <div key={i} className={`grid grid-cols-2 text-sm font-mono ${line.same ? '' : 'bg-yellow-500/5'}`}>
              <div className={`px-4 py-1 border-r border-slate-700 ${line.same ? 'text-slate-400' : 'text-red-300 bg-red-500/10'}`}>
                {line.left || '\u00A0'}
              </div>
              <div className={`px-4 py-1 ${line.same ? 'text-slate-400' : 'text-green-300 bg-green-500/10'}`}>
                {line.right || '\u00A0'}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-slate-500 mb-1 block">原始文本</label>
          <textarea
            value={left}
            onChange={e => setLeft(e.target.value)}
            className="w-full h-64 bg-slate-900 border border-slate-700 rounded-lg p-4 text-sm text-slate-300 font-mono resize-none focus:outline-none focus:border-blue-500"
            placeholder="粘贴原始版本..."
          />
        </div>
        <div>
          <label className="text-xs text-slate-500 mb-1 block">修改后文本</label>
          <textarea
            value={right}
            onChange={e => setRight(e.target.value)}
            className="w-full h-64 bg-slate-900 border border-slate-700 rounded-lg p-4 text-sm text-slate-300 font-mono resize-none focus:outline-none focus:border-blue-500"
            placeholder="粘贴修改后版本..."
          />
        </div>
      </div>
    </div>
  )
}
