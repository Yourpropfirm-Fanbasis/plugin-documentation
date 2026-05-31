'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  function logout() {
    sessionStorage.removeItem('ypf_fanbasis_auth')
    router.push('/login')
  }

  const isActive = (href: string) => pathname === href || pathname === href + '/'

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 border-b"
      style={{ background: 'var(--bg-nav)', borderColor: 'var(--border)', height: 'var(--nav-h)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center gap-4">
        {/* Logo */}
        <Link href="/docs" className="flex items-center gap-2.5 mr-2" style={{ color: 'var(--text)' }}>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#27374D,#526D82)' }}
          >
            YF
          </div>
          <span className="font-semibold text-sm hidden sm:block" style={{ color: 'var(--text)' }}>
            Plugin Docs
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1 flex-1">
          <NavLink href="/docs" active={isActive('/docs')}>
            General
          </NavLink>
          <NavLink href="/technical" active={isActive('/technical')}>
            Technical
          </NavLink>
          <a
            href="https://apidocs.fan/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
            style={{ color: 'var(--text-muted)' }}
          >
            API Docs
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 11L11 1M11 1H5M11 1V7"/>
            </svg>
          </a>
        </nav>

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
            className="text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors hover:bg-[var(--accent-lt)]"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
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
