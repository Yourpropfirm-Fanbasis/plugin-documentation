import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'Yourpropfirm Fanbasis — Documentation',
  description: 'Plugin documentation for Yourpropfirm Fanbasis WooCommerce payment gateway',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="ypf-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
