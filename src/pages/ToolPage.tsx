import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { JsonTool } from '../tools/JsonTool'
import { Base64Tool } from '../tools/Base64Tool'
import { TimestampTool } from '../tools/TimestampTool'
import { UrlTool } from '../tools/UrlTool'
import { QrcodeTool } from '../tools/QrcodeTool'
import { RegexTool } from '../tools/RegexTool'
import { ImageTool } from '../tools/ImageTool'
import { ColorTool } from '../tools/ColorTool'
import { UuidTool } from '../tools/UuidTool'
import { DiffTool } from '../tools/DiffTool'
import { HtmlEntityTool } from '../tools/HtmlEntityTool'
import { UnicodeTool } from '../tools/UnicodeTool'
import { JwtTool } from '../tools/JwtTool'
import { HashTool } from '../tools/HashTool'
import { MarkdownTool } from '../tools/MarkdownTool'
import { CharCountTool } from '../tools/CharCountTool'

const toolMap: Record<string, { name: string; component: React.FC }> = {
  json: { name: 'JSON 格式化', component: JsonTool },
  base64: { name: 'Base64 编解码', component: Base64Tool },
  timestamp: { name: '时间戳转换', component: TimestampTool },
  url: { name: 'URL 编解码', component: UrlTool },
  qrcode: { name: '二维码生成', component: QrcodeTool },
  regex: { name: '正则测试', component: RegexTool },
  image: { name: '图片压缩', component: ImageTool },
  color: { name: '颜色转换', component: ColorTool },
  uuid: { name: 'UUID 生成', component: UuidTool },
  diff: { name: '文本对比', component: DiffTool },
  html: { name: 'HTML 实体', component: HtmlEntityTool },
  unicode: { name: 'Unicode 转换', component: UnicodeTool },
  jwt: { name: 'JWT 解码', component: JwtTool },
  hash: { name: '哈希计算', component: HashTool },
  markdown: { name: 'Markdown 预览', component: MarkdownTool },
  charcount: { name: '字数统计', component: CharCountTool },
}

export function ToolPage() {
  const { toolId } = useParams<{ toolId: string }>()
  const tool = toolId ? toolMap[toolId] : undefined

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 text-lg mb-4">工具未找到</p>
          <Link to="/" className="text-blue-400 hover:underline">返回首页</Link>
        </div>
      </div>
    )
  }

  const ToolComponent = tool.component

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link to="/" className="text-slate-500 hover:text-white text-sm font-mono transition-colors">DevTools Kit</Link>
            <span className="text-slate-700">/</span>
            <h1 className="text-white font-semibold">{tool.name}</h1>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            <ExternalLink className="w-3 h-3" /> GitHub
          </a>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-6 py-8 w-full">
        <ToolComponent />
      </main>
    </div>
  )
}
