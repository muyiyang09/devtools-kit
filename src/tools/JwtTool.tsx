import { useState } from 'react'

function parseJWT(token: string) {
  const parts = token.split('.')
  if (parts.length !== 3) return null
  try {
    const header = JSON.parse(atob(parts[0]))
    const payload = JSON.parse(atob(parts[1]))
    return { header, payload, signature: parts[2] }
  } catch {
    return null
  }
}

export function JwtTool() {
  const [token, setToken] = useState('')
  const [result, setResult] = useState<ReturnType<typeof parseJWT>>(null)
  const [error, setError] = useState('')

  const decode = () => {
    const r = parseJWT(token.trim())
    if (!r) { setError('无效的 JWT Token'); setResult(null); return }
    setResult(r)
    setError('')
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <input
          value={token}
          onChange={e => setToken(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && decode()}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-300 font-mono focus:outline-none focus:border-blue-500"
          placeholder="粘贴 JWT Token..."
        />
        <button onClick={decode} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">解析</button>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {result && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
            <h3 className="text-xs text-slate-500 mb-2 uppercase tracking-wide">Header</h3>
            <pre className="text-sm text-slate-300 font-mono whitespace-pre-wrap">{JSON.stringify(result.header, null, 2)}</pre>
          </div>
          <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
            <h3 className="text-xs text-slate-500 mb-2 uppercase tracking-wide">Payload</h3>
            <pre className="text-sm text-slate-300 font-mono whitespace-pre-wrap">{JSON.stringify(result.payload, null, 2)}</pre>
            {result.payload.exp && (
              <p className="text-xs text-slate-500 mt-2">
                过期时间: {new Date(result.payload.exp * 1000).toLocaleString('zh-CN')}
                {result.payload.exp * 1000 < Date.now() && <span className="text-red-400 ml-2">已过期</span>}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
