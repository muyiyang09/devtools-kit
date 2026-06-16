import { useState } from 'react'
import { Eye, Edit3 } from 'lucide-react'

const renderMarkdown = (text: string) => {
  let html = text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-white mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-white mt-6 mb-3">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-white mt-6 mb-4">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-slate-700 px-1.5 py-0.5 rounded text-pink-300 text-sm">$1</code>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-slate-300">$1</li>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-2 border-blue-500 pl-4 py-1 my-2 text-slate-400 italic">$1</blockquote>')
    .replace(/\n\n/g, '</p><p class="mb-2 text-slate-300">')
    .replace(/\n/g, '<br/>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-blue-400 hover:underline">$1</a>')
  return `<p class="mb-2 text-slate-300">${html}</p>`
    .replace(/<li class="ml-4 list-disc text-slate-300">(.+?)<\/li>/g, '<li class="ml-4 list-disc text-slate-300 mb-1">$1</li>')
}

export function MarkdownTool() {
  const [text, setText] = useState('# Hello Markdown\n\n这是一段**粗体**和*斜体*文字。\n\n- 列表项 1\n- 列表项 2\n\n> 引用文字\n\n`行内代码`\n\n[链接文字](https://example.com)')
  const [preview, setPreview] = useState(true)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => setPreview(false)} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${!preview ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}>
          <Edit3 className="w-4 h-4" /> 编辑
        </button>
        <button onClick={() => setPreview(true)} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${preview ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}>
          <Eye className="w-4 h-4" /> 预览
        </button>
        <span className="text-xs text-slate-500 ml-auto">支持 Markdown 基础语法</span>
      </div>

      {preview ? (
        <div
          className="min-h-[400px] bg-slate-900 border border-slate-700 rounded-lg p-6"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(text) }}
        />
      ) : (
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          className="w-full min-h-[400px] bg-slate-900 border border-slate-700 rounded-lg p-6 text-sm text-slate-300 font-mono resize-none focus:outline-none focus:border-blue-500"
        />
      )}
    </div>
  )
}
