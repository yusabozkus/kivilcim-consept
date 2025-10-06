'use client'
import { useEffect, ReactNode } from 'react'
import Lenis from 'lenis'

interface Props {
  children: ReactNode
}

export default function LenisProvider({ children }: Props) {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return <>{children}</>
}