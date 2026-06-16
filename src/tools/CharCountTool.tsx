import { useState, useMemo } from 'react'

export function CharCountTool() {
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    const chars = text.length
    const charsNoSpace = text.replace(/\s/g, '').length
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const lines = text ? text.split('\n').length : 0
    const bytes = new Blob([text]).size
    const chinese = (text.match(/[\u4e00-\u9fff]/g) || []).length
    const numbers = (text.match(/\d/g) || []).length
    const letters = (text.match(/[a-zA-Z]/g) || []).length
    return { chars, charsNoSpace, words, lines, bytes, chinese, numbers, letters }
  }, [text])

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        className="w-full h-72 bg-slate-900 border border-slate-700 rounded-lg p-4 text-sm text-slate-300 resize-none focus:outline-none focus:border-blue-500"
        placeholder="在此粘贴或输入文本..."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: '总字符数', value: stats.chars },
          { label: '不含空格', value: stats.charsNoSpace },
          { label: '单词数', value: stats.words },
          { label: '行数', value: stats.lines },
          { label: '字节数', value: stats.bytes },
          { label: '中文字数', value: stats.chinese },
          { label: '数字', value: stats.numbers },
          { label: '字母', value: stats.letters },
        ].map(({ label, value }) => (
          <div key={label} className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 text-center">
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-slate-500 mt-1">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
