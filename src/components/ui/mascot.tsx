'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Mascot — character sprites from koboyo/page-mascot.
 *
 * Each mascot is two 1080×1080 sprite sheets (3×3 grid of 360px cells):
 *  - `-directions.webp` : 9 head directions (up-left → down-right), picked
 *    from the pointer angle so the character looks at the cursor.
 *  - `-reactions.webp`  : 9 expressions (blink, heart, sparkle, dizzy…),
 *    shown briefly when you poke (click) the character.
 *
 * Ported 1:1 from the koboyo public implementation.
 */

const DIRECTIONS = ['up-left', 'up', 'up-right', 'left', 'center', 'right', 'down-left', 'down', 'down-right'] as const
const REACTIONS = ['blink', 'heart', 'sparkle', 'surprised', 'wink', 'bashful', 'sleepy', 'dizzy', 'delighted'] as const
const ANGLE_SLICES = ['right', 'down-right', 'down', 'down-left', 'left', 'up-left', 'up', 'up-right'] as const

const SLICE = (Math.PI * 2) / ANGLE_SLICES.length
const HYSTERESIS = 0.12
const LOOK_CENTER_RADIUS = 70 // px — pointer within this → looks at you

const LOVE_REACTIONS = ['heart', 'sparkle', 'delighted'] as const
const BLINK_MS = 130
const REACTION_MS = 620
const DIZZY_MS = 1150
const QUICK_POKES = 4
const QUICK_POKE_WINDOW = 1600

const SQUASH: Keyframe[] = [
  { transform: 'scale(1, 1)', easing: 'ease-in' },
  { transform: 'scale(1.10, 0.86)', offset: 0.18, easing: 'ease-out' },
  { transform: 'scale(0.95, 1.08)', offset: 0.45, easing: 'ease-in-out' },
  { transform: 'scale(1.03, 0.97)', offset: 0.72, easing: 'ease-in-out' },
  { transform: 'scale(1, 1)' },
]

type Direction = (typeof DIRECTIONS)[number]
type Reaction = (typeof REACTIONS)[number]

interface MascotProps {
  /** mascot name — must exist in /public/mascots/{name}-{directions,reactions}.webp */
  name: string
  /** rendered size in px (the sheet cell is square) */
  size?: number
  className?: string
  ariaLabel?: string
}

function cellPos(index: number) {
  return {
    backgroundPosition: `${(index % 3) * 50}% ${Math.floor(index / 3) * 50}%`,
  }
}

function angleDiff(a: number, b: number) {
  return Math.atan2(Math.sin(a - b), Math.cos(a - b))
}

export function Mascot({ name, size = 140, className, ariaLabel }: MascotProps) {
  const [direction, setDirection] = useState<Direction>('center')
  const [reaction, setReaction] = useState<Reaction | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const squashRef = useRef<HTMLSpanElement>(null)
  const timers = useRef<number[]>([])
  const pokes = useRef({ count: 0, at: 0 })

  /* pointer → head direction */
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let lastSlice = -1
    let pointer: { x: number; y: number } | null = null

    const update = () => {
      const el = buttonRef.current
      if (!el || !pointer) return
      const r = el.getBoundingClientRect()
      const dx = pointer.x - (r.left + r.width / 2)
      const dy = pointer.y - (r.top + r.height / 2)
      if (Math.hypot(dx, dy) < LOOK_CENTER_RADIUS) {
        lastSlice = -1
        setDirection('center')
        return
      }
      const angle = Math.atan2(dy, dx)
      const slice = (Math.round(angle / SLICE) + ANGLE_SLICES.length) % ANGLE_SLICES.length
      /* hysteresis: only turn when the pointer crosses a slice boundary */
      if (lastSlice !== -1 && Math.abs(angleDiff(angle, lastSlice * SLICE)) < SLICE / 2 + HYSTERESIS) return
      lastSlice = slice
      setDirection(ANGLE_SLICES[slice])
    }

    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY }
      update()
    }
    const onScroll = () => update()

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  /* clear pending reaction timers on unmount */
  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  const poke = () => {
    timers.current.forEach(window.clearTimeout)
    timers.current = []
    const schedule = (delay: number, value: Reaction | null) =>
      timers.current.push(window.setTimeout(() => setReaction(value), delay))

    const now = Date.now()
    const state = pokes.current
    state.count = now - state.at < QUICK_POKE_WINDOW ? state.count + 1 : 1
    state.at = now

    if (state.count >= QUICK_POKES) {
      state.count = 0
      setReaction('dizzy')
      schedule(DIZZY_MS, null)
    } else {
      setReaction('blink')
      schedule(BLINK_MS, LOVE_REACTIONS[(state.count - 1) % LOVE_REACTIONS.length])
      schedule(REACTION_MS, null)
    }

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      squashRef.current?.animate(SQUASH, { duration: 420, easing: 'linear' })
    }
  }

  const layerStyle = {
    position: 'absolute' as const,
    inset: 0,
    backgroundSize: '300% 300%',
    backgroundRepeat: 'no-repeat' as const,
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={poke}
      aria-label={ariaLabel ?? `Vuốt ve ${name}`}
      className={className}
      style={{
        position: 'relative',
        display: 'block',
        flexShrink: 0,
        width: size,
        height: size,
        padding: 0,
        border: 0,
        background: 'transparent',
        appearance: 'none',
        cursor: 'pointer',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <span
        ref={squashRef}
        style={{
          position: 'relative',
          display: 'block',
          width: '100%',
          height: '100%',
          transformOrigin: '50% 78%',
        }}
      >
        <span
          style={{
            ...layerStyle,
            backgroundImage: `url(/mascots/${name}-directions.webp)`,
            ...cellPos(DIRECTIONS.indexOf(direction)),
            opacity: reaction ? 0 : 1,
          }}
        />
        <span
          style={{
            ...layerStyle,
            backgroundImage: `url(/mascots/${name}-reactions.webp)`,
            ...cellPos(REACTIONS.indexOf(reaction ?? 'blink')),
            opacity: reaction ? 1 : 0,
          }}
        />
      </span>
    </button>
  )
}