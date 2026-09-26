'use client'

import { motion } from 'framer-motion'
import { FlatIcon } from '@/components/ui/flat-icon'

const GROUPS = [
  {
    icon: 'code',
    title: 'Frontend',
    color: 'text-blue-400',
    bg: 'from-blue-500/15 to-transparent',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'HTML/CSS'],
  },
  {
    icon: 'palette',
    title: '3D & Design',
    color: 'text-purple-400',
    bg: 'from-purple-500/15 to-transparent',
    skills: ['Three.js', 'Spline', 'Figma', 'Blender (cơ bản)', 'UI/UX'],
  },
  {
    icon: 'stack',
    title: 'Backend & Data',
    color: 'text-emerald-400',
    bg: 'from-emerald-500/15 to-transparent',
    skills: ['Node.js', 'Express', 'MongoDB', 'REST API', 'Firebase'],
  },
  {
    icon: 'wrench',
    title: 'Thiết kế & Công cụ',
    color: 'text-amber-400',
    bg: 'from-amber-500/15 to-transparent',
    skills: ['Git & GitHub', 'Docker', 'Android Studio', 'VS Code', 'Linux (cơ bản)'],
  },
]

export function SkillsSection() {
  return (
    <section id="ky-nang" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
          <FlatIcon name="code" className="h-3.5 w-3.5" />
          Kỹ năng
        </span>
        <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Tech stack của <span className="text-gradient">mình</span>
        </h2>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {GROUPS.map((g, i) => {
          return (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="card-lift group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              data-cursor
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${g.bg} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
              <span className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <FlatIcon name={g.icon} className={`h-5 w-5 ${g.color}`} />
              </span>
              <h3 className="relative mt-4 text-base font-bold text-white">{g.title}</h3>
              <div className="relative mt-3 flex flex-wrap gap-1.5">
                {g.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-white/10 bg-black/30 px-2 py-1 text-[11px] font-medium text-neutral-300 transition-colors duration-300 group-hover:border-white/20 group-hover:text-white"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}