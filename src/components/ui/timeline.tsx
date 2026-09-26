'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FlatIcon } from '@/components/ui/flat-icon'

function useCountUp(target: number, start: boolean, duration = 1500) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])
  return value
}

const TIMELINE = [
  {
    period: '2019 — 2023',
    title: 'THPT & nền tảng đầu tiên',
    desc: 'Làm quen với máy tính, tự học lập trình cơ bản, định hình đam mê công nghệ.',
    icon: 'map-pin',
  },
  {
    period: '2023 — 2027',
    title: 'Đại học Văn Hiến — CNTT',
    desc: 'Sinh viên Công nghệ Thông tin. Học lập trình di động, web, xây dựng các dự án thực hành.',
    icon: 'calendar',
    current: true,
  },
  {
    period: '2024 — Nay',
    title: 'Dự án Web & 3D',
    desc: 'Xây dựng portfolio, ứng dụng Android, UI components, khám phá Three.js & Spline.',
    icon: 'rocket',
  },
]

const STATS = [
  { label: 'Năm theo đuổi CNTT', value: 3, suffix: '+' },
  { label: 'Dự án thử nghiệm', value: 8, suffix: '+' },
  { label: 'Công nghệ chính', value: 5, suffix: '+' },
  { label: 'Niềm đam mê', value: 100, suffix: '%' },
]

export function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="hanh-trinh" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
          <FlatIcon name="rocket" className="h-3.5 w-3.5" />
          Hành trình
        </span>
        <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Con đường của <span className="text-gradient">mình</span>
        </h2>
      </motion.div>

      <div ref={ref} className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        {/* timeline */}
        <div className="relative space-y-10 border-l border-white/10 pl-8">
          <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-blue-500/60 via-purple-500/40 to-transparent" />
          {TIMELINE.map((item, i) => {
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="relative"
              >
                <span
                  className={`absolute -left-[41px] flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-bold ${
                    item.current
                      ? 'border-blue-400 bg-blue-500/20 text-blue-300'
                      : 'border-white/20 bg-[#0a0b10] text-neutral-400'
                  }`}
                >
                  <FlatIcon name={item.icon} className="h-3.5 w-3.5" />
                </span>
                {item.current && (
                  <span className="absolute -left-[45px] top-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/40 bg-blue-500/10 animate-pulse-ring" />
                )}
                <div className="mb-1 flex items-center gap-2.5">
                  <span className="text-xs font-semibold tracking-widest text-blue-300">{item.period}</span>
                  {item.current && (
                    <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-300">
                      Hiện tại
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-1.5 max-w-md text-sm leading-relaxed text-neutral-400">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* stats */}
        <div className="grid grid-cols-2 gap-4 content-start">
          {STATS.map((s, i) => {
            const Count = () => {
              const v = useCountUp(s.value, inView)
              return (
                <span className="text-5xl font-extrabold text-gradient tabular-nums">
                  {v}
                  {s.suffix}
                </span>
              )
            }
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-lift group rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center"
                data-cursor
              >
                <Count />
                <p className="mt-2 text-xs font-medium uppercase tracking-wider text-neutral-500">
                  {s.label}
                </p>
                <div className="mx-auto mt-3 h-[2px] w-10 rounded-full bg-gradient-to-r from-blue-500/60 to-purple-500/60 opacity-60 transition-all duration-500 group-hover:w-16 group-hover:opacity-100" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}