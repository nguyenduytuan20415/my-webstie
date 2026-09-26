'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Glowing custom cursor — desktop (fine pointer) only.
 * A small blue dot follows the mouse instantly, a soft ring trails behind
 * and grows over interactive elements.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 300, damping: 26, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 300, damping: 26, mass: 0.5 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    document.documentElement.classList.add('custom-cursor-active')

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target as HTMLElement | null
      setHovering(
        !!t?.closest('a, button, [data-cursor], input, textarea, [role="button"]'),
      )
    }
    const down = () => setPressed(true)
    const up = () => setPressed(false)

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      {/* trailing ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] rounded-full border border-blue-400/70"
        style={{
          x: ringX,
          y: ringY,
          width: 38,
          height: 38,
          marginLeft: -19,
          marginTop: -19,
        }}
        animate={{
          scale: pressed ? 0.7 : hovering ? 1.8 : 1,
          opacity: pressed ? 0.6 : 1,
          backgroundColor: hovering ? 'rgba(59,130,246,0.12)' : 'rgba(59,130,246,0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      {/* dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[201] rounded-full bg-blue-400 shadow-[0_0_14px_2px_rgba(96,165,250,0.8)]"
        style={{ x, y, width: 7, height: 7, marginLeft: -3.5, marginTop: -3.5 }}
        animate={{ scale: pressed ? 0.6 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}