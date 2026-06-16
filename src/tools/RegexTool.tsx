import { useState, useMemo } from 'react'
import { Check, X } from 'lucide-react'

export function RegexTool() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [testText, setTestText] = useState('')
  const [replaced, setReplaced] = useState('')
  const [replaceWith, setReplaceWith] = useState('')

  const regexResult = useMemo(() => {
    if (!pattern) return { valid: true, matches: [] as string[], error: '' }
    try {
      const re = new RegExp(pattern, flags)
      const matches = [...testText.matchAll(re)]
      return {
        valid: true,
        matches: matches.map(m => m[0]),
        error: '',
        count: matches.length,
      }
    } catch (e: any) {
      return { valid: false, matches: [], error: e.message, count: 0 }
    }
  }, [pattern, flags, testText])

  const doReplace = () => {
    try {
      const re = new RegExp(pattern, flags)
      setReplaced(testText.replace(re, replaceWith))
    } catch {
      setReplaced('正则表达式无效')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center">
        <span className="text-sm text-slate-400">/</span>
        <input
          value={pattern}
          onChange={e => setPattern(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-green-400 font-mono focus:outline-none focus:border-blue-500"
          placeholder="正则表达式"
        />
        <span className="text-sm text-slate-400">/</span>
        <input
          value={flags}
          onChange={e => setFlags(e.target.value)}
          className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-yellow-400 font-mono focus:outline-none focus:border-blue-500"
          placeholder="g"
        />
        <div className={`flex items-center gap-1 text-sm ${regexResult.valid ? 'text-green-400' : 'text-red-400'}`}>
          {regexResult.valid ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
          {regexResult.valid ? `${regexResult.count} 个匹配` : regexResult.error}
        </div>
      </div>

      <textarea
        value={testText}
        onChange={e => setTestText(e.target.value)}
        className="w-full h-48 bg-slate-900 border border-slate-700 rounded-lg p-4 text-sm text-slate-300 font-mono resize-none focus:outline-none focus:border-blue-500"
        placeholder="测试文本..."
      />

      {regexResult.valid && regexResult.matches.length > 0 && (
        <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
          <h4 className="text-xs text-slate-500 mb-2">匹配结果 ({regexResult.count})</h4>
          <div className="space-y-1 max-h-40 overflow-auto">
            {regexResult.matches.map((m, i) => (
              <div key={i} className="text-sm text-slate-300 font-mono bg-slate-900 px-3 py-1.5 rounded">{m}</div>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
        <h4 className="text-xs text-slate-500 mb-2">替换</h4>
        <div className="flex gap-3 mb-3">
          <input value={replaceWith} onChange={e => setReplaceWith(e.target.value)} className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-300 font-mono focus:outline-none focus:border-blue-500" placeholder="替换为..." />
          <button onClick={doReplace} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors">替换</button>
        </div>
        {replaced && <pre className="text-sm text-slate-300 whitespace-pre-wrap bg-slate-900 rounded-lg p-3">{replaced}</pre>}
      </div>
    </div>
  )
}
