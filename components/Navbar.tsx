'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  function logout() {
    sessionStorage.removeItem('ypf_fanbasis_auth')
    router.push('/login')
  }

  const isActive = (href: string) => pathname === href || pathname === href + '/'

  const navItems = [
    { href: '/docs',      label: 'General',  external: false },
    { href: '/technical', label: 'Technical', external: false },
    { href: 'https://apidocs.fan/', label: 'API Docs', external: true },
  ]

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 border-b"
        style={{ background: 'var(--bg-nav)', borderColor: 'var(--border)', height: 'var(--nav-h)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center gap-3">

          {/* Logo */}
          <Link href="/docs" className="flex items-center gap-2.5 flex-shrink-0" style={{ color: 'var(--text)' }}>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ background: 'linear-gradient(135deg,#27374D,#526D82)' }}
            >
              YF
            </div>
            <span className="font-semibold text-sm hidden sm:block" style={{ color: 'var(--text)' }}>
              Plugin Docs
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1 flex-1 ml-1">
            {navItems.map(item =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {item.label}
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 11L11 1M11 1H5M11 1V7"/>
                  </svg>
                </a>
              ) : (
                <NavLink key={item.href} href={item.href} active={isActive(item.href)}>
                  {item.label}
                </NavLink>
              )
            )}
          </nav>

          {/* Spacer on mobile */}
          <div className="flex-1 md:hidden" />

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <span
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded"
              style={{ background: 'var(--accent-lt)', color: 'var(--text-muted)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#526D82] inline-block" />
              v1.2.0
            </span>
            <ThemeToggle />
            <button
              onClick={logout}
              className="hidden md:block text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors hover:bg-[var(--accent-lt)]"
              style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
            >
              Logout
            </button>
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border transition-colors"
              style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          className="fixed inset-x-0 z-40 md:hidden border-b shadow-lg"
          style={{
            top: 'var(--nav-h)',
            background: 'var(--bg-nav)',
            borderColor: 'var(--border)',
          }}
        >
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navItems.map(item =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {item.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 11L11 1M11 1H5M11 1V7"/>
                  </svg>
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    background: isActive(item.href) ? 'var(--accent-lt)' : 'transparent',
                    color: isActive(item.href) ? 'var(--brand)' : 'var(--text-muted)',
                  }}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="border-t my-1" style={{ borderColor: 'var(--border)' }} />
            <button
              onClick={() => { setMenuOpen(false); logout() }}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
      style={{
        background: active ? 'var(--accent-lt)' : 'transparent',
        color: active ? 'var(--brand)' : 'var(--text-muted)',
      }}
    >
      {children}
    </Link>
  )
}
