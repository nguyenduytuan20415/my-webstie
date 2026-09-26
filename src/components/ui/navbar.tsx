'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { FlatIcon } from '@/components/ui/flat-icon'

const LINKS = [
  { href: '#gioi-thieu', label: 'Giới thiệu' },
  { href: '#ky-nang', label: 'Kỹ năng' },
  { href: '#du-an', label: 'Dự án' },
  { href: '#hanh-trinh', label: 'Hành trình' },
  { href: '#lien-he', label: 'Liên hệ' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 24, mass: 0.4 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[90] flex flex-col"
    >
      <div className="px-3 sm:px-5">
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-5 ${
            scrolled
              ? 'mt-3 border border-white/10 bg-black/55 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)]'
              : 'mt-0 border border-transparent bg-transparent'
          }`}
        >
          {/* brand */}
          <a href="#gioi-thieu" className="group flex items-center gap-2.5" data-cursor>
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-blue-500/30 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
              <FlatIcon name="graduation-cap" className="h-5 w-5 text-white" />
              <span className="absolute -inset-1 -z-10 rounded-xl bg-gradient-to-br from-blue-500/40 to-pink-500/40 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </span>
            <span className="hidden text-sm font-bold tracking-wide text-white sm:block">
              Duy Tuấn<span className="text-gradient">.dev</span>
            </span>
          </a>

          {/* links */}
          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor
                className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-neutral-400 transition-colors duration-200 hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#lien-he"
            data-cursor
            className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-[13px] font-semibold text-white transition-all duration-300 hover:border-blue-400/50 hover:bg-blue-500/10 hover:shadow-[0_0_24px_-4px_rgba(96,165,250,0.5)]"
          >
            <FlatIcon name="sparkle" className="h-3.5 w-3.5 text-blue-400 transition-transform duration-300 group-hover:rotate-12" />
            <span className="hidden sm:inline">Kết nối với tôi</span>
            <span className="sm:hidden">Liên hệ</span>
          </a>
        </nav>
      </div>

      {/* scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="h-[2px] origin-left bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      />
    </motion.header>
  )
}