import {
  Braces, Binary, Clock, Link, QrCode, Regex, FileImage,
  Palette, Fingerprint, Diff, Code2, Globe, FileCode2,
  Hash, Text, Shield, ArrowRight
} from 'lucide-react'
import { Link as RouterLink } from 'react-router-dom'

const tools = [
  { id: 'json', name: 'JSON 格式化', icon: Braces, desc: '格式化、校验、压缩 JSON 数据', color: 'text-yellow-400' },
  { id: 'base64', name: 'Base64 编解码', icon: Binary, desc: 'Base64 编码与解码转换', color: 'text-green-400' },
  { id: 'timestamp', name: '时间戳转换', icon: Clock, desc: 'Unix 时间戳与日期互转', color: 'text-blue-400' },
  { id: 'url', name: 'URL 编解码', icon: Link, desc: 'URL 编码与解码', color: 'text-purple-400' },
  { id: 'qrcode', name: '二维码生成', icon: QrCode, desc: '文本/链接在线生成二维码', color: 'text-cyan-400' },
  { id: 'regex', name: '正则测试', icon: Regex, desc: '实时正则表达式测试', color: 'text-red-400' },
  { id: 'image', name: '图片压缩', icon: FileImage, desc: '在线压缩 PNG/JPEG/WebP', color: 'text-pink-400' },
  { id: 'color', name: '颜色转换', icon: Palette, desc: 'HEX/RGB/HSL 互转', color: 'text-orange-400' },
  { id: 'uuid', name: 'UUID 生成', icon: Fingerprint, desc: '批量生成 UUID/GUID', color: 'text-emerald-400' },
  { id: 'diff', name: '文本对比', icon: Diff, desc: '双栏文本差异对比', color: 'text-indigo-400' },
  { id: 'html', name: 'HTML 实体', icon: Code2, desc: 'HTML 实体编解码', color: 'text-amber-400' },
  { id: 'unicode', name: 'Unicode 转换', icon: Globe, desc: 'Unicode 与中文互转', color: 'text-teal-400' },
  { id: 'jwt', name: 'JWT 解码', icon: Shield, desc: '在线解析 JWT Token', color: 'text-rose-400' },
  { id: 'hash', name: '哈希计算', icon: Hash, desc: 'MD5/SHA1/SHA256 哈希', color: 'text-lime-400' },
  { id: 'markdown', name: 'Markdown 预览', icon: FileCode2, desc: '实时 Markdown 编辑预览', color: 'text-sky-400' },
  { id: 'charcount', name: '字数统计', icon: Text, desc: '字符/单词/行数统计', color: 'text-violet-400' },
]

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white">DK</div>
            <div>
              <h1 className="text-xl font-bold text-white">DevTools Kit</h1>
              <p className="text-xs text-slate-500">开发者在线工具箱</p>
            </div>
          </div>
          <RouterLink
            to="/sponsor"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-medium hover:from-pink-400 hover:to-rose-400 transition-all"
          >
            支持开发者
          </RouterLink>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          常用的，都在这
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-lg">
          15+ 开发工具，纯浏览器端运行，数据不上传，安全隐私无忧
        </p>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tools.map(tool => (
            <RouterLink
              key={tool.id}
              to={`/tool/${tool.id}`}
              className="group p-5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800 transition-all"
            >
              <tool.icon className={`w-8 h-8 mb-3 ${tool.color}`} />
              <h3 className="text-white font-semibold mb-1 group-hover:text-blue-400 transition-colors">{tool.name}</h3>
              <p className="text-slate-500 text-sm">{tool.desc}</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-slate-600 group-hover:text-slate-400 transition-colors">
                打开工具 <ArrowRight className="w-3 h-3" />
              </div>
            </RouterLink>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-slate-600">
          <p>所有工具均在你浏览器本地运行，数据不会上传到任何服务器。</p>
          <p className="mt-1">
            <RouterLink to="/sponsor" className="text-pink-500 hover:underline">支持这个项目</RouterLink>
            &nbsp;·&nbsp;
            <a href="https://github.com" target="_blank" rel="noopener" className="hover:text-slate-400">GitHub</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
