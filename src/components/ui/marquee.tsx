'use client'

import { motion } from 'framer-motion'

const ITEMS = [
  '⚛️ React',
  '▲ Next.js',
  '🔷 TypeScript',
  '🎨 Tailwind CSS',
  '🧊 Three.js',
  '✨ Spline',
  '🌀 Framer Motion',
  '🟢 Node.js',
  '🍃 Express',
  '🍃 MongoDB',
  '🐙 Git',
  '🐳 Docker',
  '🎯 Figma',
]

export function Marquee() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden border-y border-white/5 bg-white/[0.02] py-5"
    >
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#05060a] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#05060a] to-transparent" />

      <div className="flex w-max animate-marquee will-change-transform items-center gap-10">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2.5 whitespace-nowrap text-sm font-medium text-neutral-400 transition-colors hover:text-white"
            data-cursor
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  )
}