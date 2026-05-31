'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    const auth = sessionStorage.getItem('ypf_fanbasis_auth')
    router.replace(auth ? `${basePath}/docs` : `${basePath}/login`)
  }, [router])
  return null
}
