'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAME = 'NGUYỄN DUY TUẤN'

export function Preloader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let v = 0
    const t = setInterval(() => {
      v += Math.random() * 16 + 7
      if (v >= 100) {
        v = 100
        clearInterval(t)
        setTimeout(() => setDone(true), 400)
      }
      setProgress(Math.round(v))
    }, 110)
    return () => clearInterval(t)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center gap-8 bg-[#05060a]"
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(6px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 px-6">
            {NAME.split('').map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 26, rotateX: 90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.12 + i * 0.045, duration: 0.5, ease: 'easeOut' }}
                className={`text-2xl font-extrabold tracking-[0.12em] sm:text-3xl ${
                  ch === ' ' ? 'w-3' : 'text-gradient'
                }`}
                style={{ transformPerspective: 400 }}
              >
                {ch}
              </motion.span>
            ))}
          </div>

          <div className="w-56">
            <div className="mb-2 flex items-center justify-between text-[10px] font-medium tracking-widest text-neutral-400">
              <span>ĐANG TẢI PORTFOLIO 3D</span>
              <span className="tabular-nums text-blue-400">{progress}%</span>
            </div>
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}