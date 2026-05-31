'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ThemeToggle } from '@/components/ThemeToggle'

function simpleHash(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0
  }
  return hash.toString(16)
}
const CORRECT = simpleHash('yourpropfirm26')
const SESSION_KEY = 'ypf_fanbasis_auth'

export default function LoginPage() {
  const router = useRouter()
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [show, setShow] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === CORRECT) {
      router.replace('/docs')
    } else {
      inputRef.current?.focus()
    }
  }, [router])

  function attempt() {
    if (simpleHash(value) === CORRECT) {
      sessionStorage.setItem(SESSION_KEY, CORRECT)
      router.replace('/docs')
    } else {
      setError(true)
      setValue('')
      inputRef.current?.focus()
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ background: 'linear-gradient(135deg, #131e2b 0%, #27374D 45%, #526D82 100%)' }}
    >
      {/* Theme toggle in corner */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Card */}
      <div
        className="w-full max-w-sm rounded-2xl p-8 shadow-2xl"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold mb-4 shadow-lg"
            style={{ background: 'linear-gradient(135deg,#27374D,#526D82)' }}
          >
            YF
          </div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text)' }}>
            Yourpropfirm Fanbasis
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Plugin Documentation — Confidential
          </p>
        </div>

        {/* Form */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
            Password
          </label>
          <div className="relative">
            <input
              ref={inputRef}
              type={show ? 'text' : 'password'}
              value={value}
              onChange={e => { setValue(e.target.value); setError(false) }}
              onKeyDown={e => e.key === 'Enter' && attempt()}
              placeholder="Enter password"
              className="w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-all"
              style={{
                background: 'var(--bg-page)',
                border: `1.5px solid ${error ? '#ef4444' : 'var(--border)'}`,
                color: 'var(--text)',
              }}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShow(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded text-lg"
              style={{ color: 'var(--text-faint)' }}
            >
              {show ? '🙈' : '👁'}
            </button>
          </div>

          {error && (
            <p className="text-xs text-red-500 flex items-center gap-1.5">
              <span>⚠</span> Incorrect password. Please try again.
            </p>
          )}

          <button
            onClick={attempt}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80"
            style={{ background: 'linear-gradient(135deg,#27374D,#526D82)' }}
          >
            Continue
          </button>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs mt-6" style={{ color: 'var(--text-faint)' }}>
          Internal use only. Do not distribute.
        </p>
      </div>

      {/* Bottom color palette strip */}
      <div className="flex gap-2 mt-8">
        {['#27374D','#526D82','#9DB2BF','#DDE6ED'].map(c => (
          <div key={c} className="w-8 h-1.5 rounded-full opacity-60" style={{ background: c }} />
        ))}
      </div>
    </div>
  )
}
