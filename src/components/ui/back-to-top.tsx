'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FlatIcon } from '@/components/ui/flat-icon'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          whileHover={{ y: -3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Quay lại đầu trang"
          data-cursor
          className="fixed bottom-6 right-6 z-[85] flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/60 backdrop-blur-xl shadow-[0_8px_30px_-6px_rgba(59,130,246,0.5)] transition-colors hover:border-blue-400/60 hover:bg-blue-500/15"
        >
          <FlatIcon name="arrow-up" className="h-5 w-5 text-blue-300" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}