import { Link } from 'react-router-dom'
import { Heart, Coffee, Gift, ArrowLeft } from 'lucide-react'

export function Sponsor() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link to="/" className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-white">支持开发者</h1>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-3">感谢你的支持</h2>
          <p className="text-slate-400 text-lg">
            这个工具箱完全免费、无广告、不收集数据。如果它帮到了你，请考虑请我喝杯咖啡。
          </p>
        </div>

        {/* Sponsor options */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
              <Coffee className="w-6 h-6 text-amber-400" />
              <h3 className="text-white font-semibold text-lg">微信赞赏</h3>
            </div>
            <div className="bg-slate-900 rounded-lg p-4 text-center">
              <div className="w-48 h-48 mx-auto bg-slate-700 rounded-lg flex items-center justify-center mb-3">
                <Gift className="w-12 h-12 text-slate-500" />
              </div>
              <p className="text-slate-400 text-sm">请将你的收款二维码替换此处</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <h3 className="text-white font-semibold text-lg mb-2">GitHub Sponsor</h3>
            <p className="text-slate-400 text-sm mb-4">
              通过 GitHub Sponsors 每月赞助，支持项目持续开发
            </p>
            <a
              href="https://github.com/sponsors"
              target="_blank"
              rel="noopener"
              className="inline-block px-6 py-2.5 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition-colors text-sm font-medium"
            >
              前往 GitHub Sponsor
            </a>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <h3 className="text-white font-semibold text-lg mb-2">分享给朋友</h3>
            <p className="text-slate-400 text-sm">
              把 DevTools Kit 分享给你的同事和朋友，就是对项目最大的支持
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800 py-6">
        <p className="text-center text-sm text-slate-600">DevTools Kit — 开发者在线工具箱</p>
      </footer>
    </div>
  )
}
