'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface StudentIdCardProps {
  name?: string
  university?: string
  shortName?: string
  birthDate?: string
  studentId?: string
  major?: string
  avatarUrl?: string
  className?: string
}

const CARD_W = 288
const CARD_H = 182
const GRAVITY = 0.55
const BOUNCE = 0.45
const FRICTION = 0.985
const SWING_K = 0.006
const SWING_DAMP = 0.96
const MAX_SWING = 250
const INITIAL_Y = -640

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-1.5 leading-tight">
      <span className="w-[46px] shrink-0 text-[8px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </span>
      <span className="truncate text-[11px] font-medium text-slate-700">{value}</span>
    </div>
  )
}

export function StudentIdCard({
  name = 'Nguyễn Duy Tuấn',
  university = 'ĐẠI HỌC VĂN HIẾN',
  shortName = 'VHU',
  birthDate = '15/01/2004',
  studentId = '231A010702',
  major = 'Công nghệ Thông tin',
  avatarUrl,
  className = 'h-[420px] md:h-[560px]',
}: StudentIdCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const strapOuterRef = useRef<SVGPathElement>(null)
  const strapInnerRef = useRef<SVGPathElement>(null)
  const strapDotsRef = useRef<SVGPathElement>(null)
  const clipRef = useRef<SVGGElement>(null)
  const labelRef = useRef<SVGGElement>(null)

  const [isDragging, setIsDragging] = useState(false)

  // Simulation data lives in refs — zero React re-renders during motion.
  const pos = useRef({ x: 0, y: INITIAL_Y })
  const vel = useRef({ x: 0, y: 0 })
  const draggingRef = useRef(false)
  const settledRef = useRef(false)
  const sizeRef = useRef({ w: 640, h: 520 })
  const floorRef = useRef(520 - 30 - CARD_H)

  const pointer = useRef({
    startX: 0,
    startY: 0,
    baseX: 0,
    baseY: 0,
    px: 0,
    py: 0,
    pt: 0,
    vx: 0,
    vy: 0,
  })

  /** Handle to (re)start the physics loop — set by the rAF effect below. */
  const startLoopRef = useRef<() => void>(() => {})

  const measure = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    if (r.width > 0 && r.height > 0) {
      sizeRef.current = { w: r.width, h: r.height }
      floorRef.current = r.height - 30 - CARD_H
      svgRef.current?.setAttribute('viewBox', `0 0 ${r.width} ${r.height}`)
    }
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('orientationchange', measure)
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('orientationchange', measure)
    }
  }, [measure])

  /** Write the current physics state straight into the DOM (no React). */
  const applyTransform = useCallback(() => {
    const w = sizeRef.current.w
    const p = pos.current
    const v = vel.current

    if (wrapperRef.current) {
      wrapperRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`
    }
    if (cardRef.current) {
      const rx = clamp(-v.y * 0.9, -10, 6)
      const ry = clamp(-v.x * 1.6, -14, 14)
      cardRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
    }

    // --- Lanyard geometry ---
    const anchorX = w / 2
    const anchorY = 10
    const clipX = w / 2 + p.x
    const clipY = p.y - 4
    const ddx = clipX - anchorX
    const ddy = clipY - anchorY
    const dist = Math.hypot(ddx, ddy)
    const sag = Math.min(70, 8 + dist * 0.07) * (dist > 24 ? 1 : dist / 24)
    const midX = (anchorX + clipX) / 2
    const midY = (anchorY + clipY) / 2 + sag
    const d = `M ${anchorX} ${anchorY} Q ${midX} ${midY} ${clipX} ${clipY}`

    strapOuterRef.current?.setAttribute('d', d)
    strapInnerRef.current?.setAttribute('d', d)
    strapDotsRef.current?.setAttribute('d', d)
    clipRef.current?.setAttribute('transform', `translate(${clipX} ${clipY})`)

    let deg = (Math.atan2(ddy, ddx) * 180) / Math.PI
    if (deg > 90 || deg < -90) deg += 180
    const LP = 0.55
    const lx = anchorX + (clipX - anchorX) * LP
    const ly = anchorY + (clipY - anchorY) * LP
    labelRef.current?.setAttribute('transform', `translate(${lx} ${ly}) rotate(${deg})`)
  }, [])

  // Physics loop — only runs while something is moving (falling, swinging,
  // dragging). Stops itself once the card settles → zero idle CPU/GPU cost.
  useEffect(() => {
    let raf = 0

    const step = () => {
      const p = pos.current
      const v = vel.current

      // Anything to simulate this frame?
      const active =
        draggingRef.current ||
        !settledRef.current ||
        Math.abs(v.x) > 0.05 ||
        Math.abs(v.y) > 0.05
      if (!active) return

      if (!draggingRef.current) {
        if (!settledRef.current) {
          // Free fall
          v.y += GRAVITY
          p.x += v.x
          p.y += v.y

          if (p.y >= floorRef.current) {
            p.y = floorRef.current
            v.y = -v.y * BOUNCE
            v.x *= FRICTION
            if (Math.abs(v.y) < 1.2) {
              v.y = 0
              settledRef.current = true
              if (Math.abs(v.x) < 0.6) v.x = (Math.random() - 0.5) * 4
            }
          }
          if (Math.abs(p.x) > MAX_SWING && p.y >= floorRef.current - 2) {
            p.x = Math.sign(p.x) * MAX_SWING
            v.x = -v.x * 0.4
          }
        } else if (Math.abs(v.x) > 0.05 || Math.abs(v.y) > 0.05) {
          // Pendulum sway back toward center
          v.x += -SWING_K * p.x
          v.x *= SWING_DAMP
          v.y *= SWING_DAMP
          p.x += v.x
          p.y += v.y
        }
        applyTransform()
      }

      raf = requestAnimationFrame(step)
    }

    startLoopRef.current = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(step)
    }
    startLoopRef.current()

    return () => cancelAnimationFrame(raf)
  }, [applyTransform])

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    const c = pointer.current
    c.startX = e.clientX
    c.startY = e.clientY
    c.baseX = pos.current.x
    c.baseY = pos.current.y
    c.px = e.clientX
    c.py = e.clientY
    c.pt = performance.now()
    c.vx = 0
    c.vy = 0
    vel.current.x = 0
    vel.current.y = 0
    draggingRef.current = true
    settledRef.current = true
    setIsDragging(true)
    startLoopRef.current()
  }

  const onPointerMove = (e: React.PointerEvent | PointerEvent) => {
    if (!draggingRef.current) return
    const c = pointer.current
    const now = performance.now()
    const dt = Math.max(now - c.pt, 1)
    const dx = e.clientX - c.px
    const dy = e.clientY - c.py
    c.vx = dx / dt
    c.vy = dy / dt
    c.px = e.clientX
    c.py = e.clientY
    c.pt = now

    const nx = c.baseX + (e.clientX - c.startX)
    const ny = c.baseY + (e.clientY - c.startY)
    pos.current.x = nx
    pos.current.y = ny
    applyTransform()
  }

  const onPointerUp = () => {
    if (!draggingRef.current) return
    const c = pointer.current
    vel.current.x = clamp(c.vx * 16.7 * 1.6, -40, 40)
    vel.current.y = clamp(c.vy * 16.7 * 1.6, -40, 40)

    if (pos.current.y > floorRef.current) {
      pos.current.y = floorRef.current
      vel.current.y = 0
      if (Math.abs(vel.current.x) < 1) vel.current.x = (Math.random() - 0.5) * 3
    }
    if (pos.current.x > MAX_SWING) pos.current.x = MAX_SWING
    if (pos.current.x < -MAX_SWING) pos.current.x = -MAX_SWING

    draggingRef.current = false
    settledRef.current = false
    setIsDragging(false)
  }

  useEffect(() => {
    const move = (e: PointerEvent) => onPointerMove(e)
    const up = () => onPointerUp()
    if (isDragging) {
      window.addEventListener('pointermove', move)
      window.addEventListener('pointerup', up)
      window.addEventListener('pointercancel', up)
    }
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width: '100%' }}
    >
      {/* ===== Lanyard strap (SVG) — animated via refs, no re-render ===== */}
      <svg
        ref={svgRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`0 0 ${sizeRef.current.w} ${sizeRef.current.h}`}
      >
        <defs>
          <linearGradient id="clipGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f1f5f9" />
            <stop offset="0.45" stopColor="#94a3b8" />
            <stop offset="0.55" stopColor="#94a3b8" />
            <stop offset="1" stopColor="#cbd5e1" />
          </linearGradient>
        </defs>

        {/* anchor hook (top) */}
        <circle cx={sizeRef.current.w / 2} cy={12} r={5.5} fill="none" stroke="#64748b" strokeWidth={3.5} />
        <circle cx={sizeRef.current.w / 2} cy={12} r={1.8} fill="#334155" />

        {/* strap layers */}
        <path ref={strapOuterRef} d="" fill="none" stroke="#173a8f" strokeWidth={18} strokeLinecap="round" />
        <path ref={strapInnerRef} d="" fill="none" stroke="#e11d48" strokeWidth={9} strokeLinecap="round" />
        <path
          ref={strapDotsRef}
          d=""
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth={2.5}
          strokeDasharray="0.5 7"
          strokeLinecap="round"
        />

        {/* printed university label */}
        <g ref={labelRef}>
          <rect x={-54} y={-11} width={108} height={22} rx={5} fill="#173a8f" stroke="rgba(255,255,255,0.4)" strokeWidth={1} />
          <text
            x={0}
            y={3}
            textAnchor="middle"
            fontFamily="inherit"
            fontWeight={700}
            fontSize={9.5}
            letterSpacing="1"
            fill="#fff"
          >
            {university}
          </text>
        </g>

        {/* metal clip */}
        <g ref={clipRef}>
          <rect x={-11} y={-26} width={22} height={40} rx={10} fill="url(#clipGrad)" stroke="#475569" strokeWidth={1.6} />
          <rect x={-8.5} y={-23.5} width={17} height={35} rx={8} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={1} />
          <circle cx={0} cy={-16} r={4.5} fill="none" stroke="#64748b" strokeWidth={3} />
          <rect x={-5} y={-6} width={10} height={9} rx={2.5} fill="#0f172a" />
          <rect x={-6.5} y={7} width={13} height={5.5} rx={2.5} fill="#0f172a" />
        </g>
      </svg>

      {/* ===== Movable card group ===== */}
      <div
        ref={wrapperRef}
        className="absolute top-0 will-change-transform"
        style={{
          left: '50%',
          marginLeft: -CARD_W / 2,
          perspective: 900,
          transform: `translate3d(0px, ${INITIAL_Y}px, 0)`,
          zIndex: isDragging ? 60 : 20,
        }}
      >
        {/* invisible grab area over the clip */}
        <div
          className="absolute left-1/2 -translate-x-1/2 cursor-grab touch-none"
          style={{ top: -34, width: 44, height: 40 }}
          onPointerDown={onPointerDown}
        />

        {/* the 3D card */}
        <div
          ref={cardRef}
          className={`relative select-none touch-none will-change-transform ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ width: CARD_W, height: CARD_H, transformStyle: 'preserve-3d' }}
          onPointerDown={onPointerDown}
        >
          {/* clip slot on the card top edge */}
          <div className="absolute left-1/2 top-0 h-[6px] w-9 -translate-x-1/2 rounded-b-md bg-gradient-to-b from-neutral-500 to-neutral-700" />

          {/* card face */}
          <div className="relative h-full w-full overflow-hidden rounded-[14px] border border-neutral-300 bg-gradient-to-b from-white via-neutral-50 to-neutral-100 shadow-[0_30px_70px_-18px_rgba(2,6,23,0.65),0_8px_24px_-12px_rgba(2,6,23,0.4)]">
            {/* top band: university */}
            <div className="flex h-10 w-full items-center gap-2 bg-gradient-to-r from-[#0b2a75] via-[#1e40af] to-[#0b2a75] px-3">
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path d="M12 1 L21 5 V11 C21 17 17 21 12 23 C7 21 3 17 3 11 V5 Z" fill="#fbbf24" />
                <path d="M12 4 L18.5 7 V11 C18.5 15.5 15.5 18.6 12 20.2 C8.5 18.6 5.5 15.5 5.5 11 V7 Z" fill="#0b2a75" />
                <text x="12" y="14" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fbbf24" fontFamily="inherit">
                  {shortName}
                </text>
              </svg>
              <div className="flex flex-col leading-none">
                <span className="text-[11px] font-bold tracking-[0.18em] text-white">{university}</span>
                <span className="text-[8px] tracking-[0.22em] text-amber-300/90">
                  VAN HIEN UNIVERSITY
                </span>
              </div>
            </div>

            {/* photo + info */}
            <div className="flex gap-3 px-3 pt-2.5">
              {/* photo */}
              <div
                className="relative w-[76px] shrink-0 overflow-hidden rounded-lg border border-neutral-300 bg-gradient-to-b from-blue-50 to-slate-200 shadow-inner"
                style={{ height: 104 }}
              >
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-0.5">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span className="text-[8px] font-medium tracking-wider text-slate-500">ẢNH THẺ</span>
                    <span className="text-[7px] text-slate-400">placeholder</span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-amber-400 to-amber-500" />
              </div>

              {/* info */}
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <div className="text-[14.5px] font-bold leading-tight tracking-tight text-slate-800">
                  {name}
                </div>
                <div className="mt-1 mb-2 h-[2px] w-16 rounded-full bg-gradient-to-r from-amber-400 to-transparent" />
                <InfoRow label="MSSV" value={studentId} />
                <InfoRow label="Ngày sinh" value={birthDate} />
                <InfoRow label="Khoa" value={major} />
                <InfoRow label="Khóa" value="2023 – 2027" />
              </div>
            </div>

            {/* hologram sticker */}
            <div className="absolute right-2 top-[54px] h-[18px] w-7 rounded-[3px] bg-gradient-to-br from-emerald-300/80 via-teal-200/60 to-emerald-400/80 backdrop-blur-[0.3px]" />

            {/* barcode bottom-right */}
            <div className="absolute right-0 bottom-0 flex h-6 w-24 items-center justify-center gap-[2px] overflow-hidden rounded-tl-md bg-gradient-to-r from-slate-100 to-slate-200">
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={i} className="w-[2px] bg-slate-700" style={{ height: 10 + ((i * 7) % 12) }} />
              ))}
            </div>
          </div>

          {/* edge highlight for depth */}
          <div className="pointer-events-none absolute inset-0 rounded-[14px] border border-white/20" />

          {/* drag hint */}
          <div className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 pt-3 whitespace-nowrap text-center text-[11px] text-neutral-400">
            <span className="inline-flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="12" r="1" />
                <circle cx="15" cy="12" r="1" />
                <circle cx="9" cy="6" r="1" />
                <circle cx="15" cy="6" r="1" />
                <circle cx="9" cy="18" r="1" />
                <circle cx="15" cy="18" r="1" />
              </svg>
              Kéo thả thẻ sinh viên 3D
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}