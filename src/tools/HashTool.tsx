import { useState, useCallback } from 'react'
import { Copy, Check } from 'lucide-react'

async function sha256(text: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('')
}

async function sha1(text: string) {
  const buf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(text))
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('')
}

// MD5 using a pure JS approach (simplified - for web crypto doesn't have MD5 native)
function md5(string: string) {
  function RotateLeft(lValue: number, iShiftBits: number) { return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits)) }
  function AddUnsigned(lX: number, lY: number) { const lX8 = lX & 0x80000000; const lY8 = lY & 0x80000000; const lX4 = lX & 0x40000000; const lY4 = lY & 0x40000000; const lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF); if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8; if (lX4 | lY4) { if (lResult & 0x40000000) return lResult ^ 0xC0000000 ^ lX8 ^ lY8; else return lResult ^ 0x40000000 ^ lX8 ^ lY8 } else return lResult ^ lX8 ^ lY8 }
  function F(x: number, y: number, z: number) { return (x & y) | ((~x) & z) }
  function G(x: number, y: number, z: number) { return (x & z) | (y & (~z)) }
  function H(x: number, y: number, z: number) { return x ^ y ^ z }
  function I(x: number, y: number, z: number) { return y ^ (x | (~z)) }
  function FF(a: number, b: number, c: number, d: number, x: number, s: number, ac: number) { a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac)); return AddUnsigned(RotateLeft(a, s), b) }
  function GG(a: number, b: number, c: number, d: number, x: number, s: number, ac: number) { a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac)); return AddUnsigned(RotateLeft(a, s), b) }
  function HH(a: number, b: number, c: number, d: number, x: number, s: number, ac: number) { a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac)); return AddUnsigned(RotateLeft(a, s), b) }
  function II(a: number, b: number, c: number, d: number, x: number, s: number, ac: number) { a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac)); return AddUnsigned(RotateLeft(a, s), b) }
  function ConvertToWordArray(string: string) { const lWordCount = (((string.length + 8) - (string.length + 8) % 64) / 64 + 1) * 16; const lWordArray = Array(lWordCount - 1); let lByteCount = 0; while (lByteCount < string.length) { lWordArray[lByteCount >> 2] |= string.charCodeAt(lByteCount) << (lByteCount % 4 * 8); lByteCount++ } lWordArray[lByteCount >> 2] |= 0x80 << (lByteCount % 4 * 8); lWordArray[lWordCount - 2] = string.length << 3; lWordArray[lWordCount - 1] = string.length >>> 29; return lWordArray }
  function WordToHex(lValue: number) { let WordToHexValue = ''; for (let lCount = 0; lCount <= 3; lCount++) { const lByte = (lValue >>> (lCount * 8)) & 255; WordToHexValue += ('0' + lByte.toString(16)).slice(-2) } return WordToHexValue }
  const x = ConvertToWordArray(string); let a = 0x67452301; let b = 0xEFCDAB89; let c = 0x98BADCFE; let d = 0x10325476
  for (let k = 0; k < x.length; k += 16) { const AA = a; const BB = b; const CC = c; const DD = d; a = FF(a, b, c, d, x[k], 7, 0xD76AA478); d = FF(d, a, b, c, x[k + 1], 12, 0xE8C7B756); c = FF(c, d, a, b, x[k + 2], 17, 0x242070DB); b = FF(b, c, d, a, x[k + 3], 22, 0xC1BDCEEE); a = FF(a, b, c, d, x[k + 4], 7, 0xF57C0FAF); d = FF(d, a, b, c, x[k + 5], 12, 0x4787C62A); c = FF(c, d, a, b, x[k + 6], 17, 0xA8304613); b = FF(b, c, d, a, x[k + 7], 22, 0xFD469501); a = FF(a, b, c, d, x[k + 8], 7, 0x698098D8); d = FF(d, a, b, c, x[k + 9], 12, 0x8B44F7AF); c = FF(c, d, a, b, x[k + 10], 17, 0xFFFF5BB1); b = FF(b, c, d, a, x[k + 11], 22, 0x895CD7BE); a = FF(a, b, c, d, x[k + 12], 7, 0x6B901122); d = FF(d, a, b, c, x[k + 13], 12, 0xFD987193); c = FF(c, d, a, b, x[k + 14], 17, 0xA679438E); b = FF(b, c, d, a, x[k + 15], 22, 0x49B40821); a = GG(a, b, c, d, x[k + 1], 5, 0xF61E2562); d = GG(d, a, b, c, x[k + 6], 9, 0xC040B340); c = GG(c, d, a, b, x[k + 11], 14, 0x265E5A51); b = GG(b, c, d, a, x[k], 20, 0xE9B6C7AA); a = GG(a, b, c, d, x[k + 5], 5, 0xD62F105D); d = GG(d, a, b, c, x[k + 10], 9, 0x2441453); c = GG(c, d, a, b, x[k + 15], 14, 0xD8A1E681); b = GG(b, c, d, a, x[k + 4], 20, 0xE7D3FBC8); a = GG(a, b, c, d, x[k + 9], 5, 0x21E1CDE6); d = GG(d, a, b, c, x[k + 14], 9, 0xC33707D6); c = GG(c, d, a, b, x[k + 3], 14, 0xF4D50D87); b = GG(b, c, d, a, x[k + 8], 20, 0x455A14ED); a = GG(a, b, c, d, x[k + 13], 5, 0xA9E3E905); d = GG(d, a, b, c, x[k + 2], 9, 0xFCEFA3F8); c = GG(c, d, a, b, x[k + 7], 14, 0x676F02D9); b = GG(b, c, d, a, x[k + 12], 20, 0x8D2A4C8A); a = HH(a, b, c, d, x[k + 5], 4, 0xFFFA3942); d = HH(d, a, b, c, x[k + 8], 11, 0x8771F681); c = HH(c, d, a, b, x[k + 11], 16, 0x6D9D6122); b = HH(b, c, d, a, x[k + 14], 23, 0xFDE5380C); a = HH(a, b, c, d, x[k + 1], 4, 0xA4BEEA44); d = HH(d, a, b, c, x[k + 4], 11, 0x4BDECFA9); c = HH(c, d, a, b, x[k + 7], 16, 0xF6BB4B60); b = HH(b, c, d, a, x[k + 10], 23, 0xBEBFBC70); a = HH(a, b, c, d, x[k + 13], 4, 0x289B7EC6); d = HH(d, a, b, c, x[k], 11, 0xEAA127FA); c = HH(c, d, a, b, x[k + 3], 16, 0xD4EF3085); b = HH(b, c, d, a, x[k + 6], 23, 0x4881D05); a = HH(a, b, c, d, x[k + 9], 4, 0xD9D4D039); d = HH(d, a, b, c, x[k + 12], 11, 0xE6DB99E5); c = HH(c, d, a, b, x[k + 15], 16, 0x1FA27CF8); b = HH(b, c, d, a, x[k + 2], 23, 0xC4AC5665); a = II(a, b, c, d, x[k], 6, 0xF4292244); d = II(d, a, b, c, x[k + 7], 10, 0x432AFF97); c = II(c, d, a, b, x[k + 14], 15, 0xAB9423A7); b = II(b, c, d, a, x[k + 5], 21, 0xFC93A039); a = II(a, b, c, d, x[k + 12], 6, 0x655B59C3); d = II(d, a, b, c, x[k + 3], 10, 0x8F0CCC92); c = II(c, d, a, b, x[k + 10], 15, 0xFFEFF47D); b = II(b, c, d, a, x[k + 1], 21, 0x85845DD1); a = II(a, b, c, d, x[k + 8], 6, 0x6FA87E4F); d = II(d, a, b, c, x[k + 15], 10, 0xFE2CE6E0); c = II(c, d, a, b, x[k + 6], 15, 0xA3014314); b = II(b, c, d, a, x[k + 13], 21, 0x4E0811A1); a = II(a, b, c, d, x[k + 4], 6, 0xF7537E82); d = II(d, a, b, c, x[k + 11], 10, 0xBD3AF235); c = II(c, d, a, b, x[k + 2], 15, 0x2AD7D2BB); b = II(b, c, d, a, x[k + 9], 21, 0xEB86D391); a = AddUnsigned(a, AA); b = AddUnsigned(b, BB); c = AddUnsigned(c, CC); d = AddUnsigned(d, DD) }
  return (WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d)).toLowerCase()
}

export function HashTool() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<{ algo: string; hash: string }[]>([])
  const [copiedAlgo, setCopiedAlgo] = useState('')

  const compute = useCallback(async () => {
    setResults([
      { algo: 'MD5', hash: md5(input) },
      { algo: 'SHA-1', hash: await sha1(input) },
      { algo: 'SHA-256', hash: await sha256(input) },
    ])
  }, [input])

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-300 font-mono focus:outline-none focus:border-blue-500"
          placeholder="输入文本计算哈希..."
        />
        <button onClick={compute} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">计算</button>
      </div>

      {results.map(({ algo, hash }) => (
        <div key={algo} className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded-lg px-4 py-3">
          <span className="text-xs text-slate-500 w-20">{algo}</span>
          <code className="flex-1 text-sm text-slate-300 font-mono truncate">{hash}</code>
          <button onClick={() => { navigator.clipboard.writeText(hash); setCopiedAlgo(algo); setTimeout(() => setCopiedAlgo(''), 1500) }} className="text-slate-400 hover:text-white ml-3">
            {copiedAlgo === algo ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      ))}
    </div>
  )
}
