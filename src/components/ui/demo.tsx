'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FlatIcon } from '@/components/ui/flat-icon'
import { StudentIdCard } from '@/components/ui/student-id-card'
import { HeroPets } from '@/components/ui/pets'

const ROLES = [
  'Sinh viên CNTT · ĐH Văn Hiến',
  'Frontend Developer',
  '3D & Web Enthusiast',
  'React / Next.js / TypeScript',
]

function useTypewriter(words: string[]) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]
    let t: number | undefined
    if (!deleting && text === current) {
      t = window.setTimeout(() => setDeleting(true), 1700)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((v) => v + 1)
    } else {
      t = window.setTimeout(
        () => setText(current.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? 26 : 68,
      )
    }
    return () => window.clearTimeout(t)
  }, [text, deleting, index, words])

  return text
}

export function HeroSection() {
  const typed = useTypewriter(ROLES)

  return (
    <section id="gioi-thieu" className="relative scroll-mt-24 overflow-hidden pt-32 sm:pt-36">
      {/* ambient orbs — radial-gradient glow (no blur filter → cheap to paint) */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-32 left-1/4 h-96 w-96 animate-float-slow"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.16) 0%, rgba(37,99,235,0) 68%)' }}
        />
        <div
          className="absolute right-1/4 top-40 h-80 w-80 animate-float-slower"
          style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.16) 0%, rgba(147,51,234,0) 68%)' }}
        />
        <div
          className="absolute bottom-0 left-10 h-64 w-64 animate-float-slow"
          style={{ background: 'radial-gradient(circle, rgba(219,39,119,0.12) 0%, rgba(219,39,119,0) 68%)' }}
        />
        {/* grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* ===== Left: personal info ===== */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.6 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-neutral-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Sinh viên Đại học Văn Hiến
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-[64px]"
            >
              Nguyễn
              <br />
              <span className="text-gradient">Duy Tuấn</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.6 }}
              className="flex items-center gap-2 font-mono text-sm text-blue-300 sm:text-base"
            >
              <span className="text-neutral-600">&gt;</span>
              {typed}
              <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-blue-400" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap gap-2.5 text-sm text-neutral-300"
            >
              {[
                ['🎂', '15/01/2004'],
                ['🆔', 'MSSV: 231A010702'],
                ['📚', 'Khoa CNTT'],
                ['📍', 'TP.HCM'],
              ].map(([icon, label]) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 transition-colors duration-300 hover:border-blue-400/30"
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.6 }}
              className="max-w-md text-[15px] leading-relaxed text-neutral-400"
            >
              Đam mê phát triển ứng dụng web, mobile và trải nghiệm 3D tương tác.
              Luôn tìm kiếm cơ hội học hỏi và đóng góp vào các dự án công nghệ thực tế.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.46, duration: 0.6 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href="#du-an"
                data-cursor
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:shadow-blue-500/50 hover:brightness-110"
              >
                Xem dự án
                <FlatIcon name="arrow-right" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="mailto:nguyenduynttuan2004@gmail.com"
                data-cursor
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/10"
              >
                <FlatIcon name="email" className="h-4 w-4 text-blue-400" />
                Liên hệ
              </a>
            </motion.div>
          </div>

          {/* ===== Right: 3D student ID card with lanyard ===== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="pointer-events-none absolute right-6 top-6 h-28 w-28"
              style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.16) 0%, rgba(59,130,246,0) 70%)' }}
            />
            <div
              className="pointer-events-none absolute bottom-14 left-2 h-20 w-20"
              style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.14) 0%, rgba(34,211,238,0) 70%)' }}
            />

            <StudentIdCard
              name="Nguyễn Duy Tuấn"
              university="ĐẠI HỌC VĂN HIẾN"
              shortName="VHU"
              birthDate="15/01/2004"
              studentId="231A010702"
              major="Công nghệ Thông tin"
              className="h-[420px] md:h-[560px]"
            />

            {/* cute pet squad */}
            <HeroPets />
          </motion.div>
        </div>
      </div>
    </section>
  )
}