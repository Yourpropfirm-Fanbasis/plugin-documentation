'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from './Navbar'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

interface TocItem { id: string; label: string }

export function PageLayout({ toc, children }: { toc: TocItem[]; children: React.ReactNode }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const hash = sessionStorage.getItem('ypf_fanbasis_auth')
    if (!hash) { router.replace(`${basePath}/login`); return }
    setReady(true)
  }, [router])

  useEffect(() => {
    const ids = toc.map(t => t.id)
    const observer = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) { setActive(e.target.id); break }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [toc])

  if (!ready) return null

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6" style={{ paddingTop: 'calc(var(--nav-h) + 32px)' }}>
        <div className="flex gap-8">
          {/* Sidebar TOC */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-20">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-faint)' }}>
                On this page
              </p>
              <nav className="flex flex-col gap-0.5">
                {toc.map(item => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-sm py-1 px-2 rounded-md transition-colors block"
                    style={{
                      color: active === item.id ? 'var(--brand)' : 'var(--text-muted)',
                      background: active === item.id ? 'var(--accent-lt)' : 'transparent',
                      fontWeight: active === item.id ? 600 : 400,
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0 pb-20">
            {children}
          </main>
        </div>
      </div>

      <footer
        className="border-t py-6 text-center text-xs mt-8"
        style={{ borderColor: 'var(--border)', color: 'var(--text-faint)' }}
      >
        Yourpropfirm Fanbasis · Version 1.2.0 · For WooCommerce · Internal Use Only
        {' · '}
        <a
          href="https://apidocs.fan/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:underline"
          style={{ color: 'var(--text-faint)' }}
        >
          Fanbasis API Docs
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 11L11 1M11 1H5M11 1V7"/>
          </svg>
        </a>
      </footer>
    </>
  )
}
