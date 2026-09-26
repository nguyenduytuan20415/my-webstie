'use client'

import { motion } from 'framer-motion'
import { FlatIcon } from '@/components/ui/flat-icon'

interface Project {
  title: string
  desc: string
  tags: string[]
  icon: string
  gradient: string
  type: 'web' | 'mobile' | '3d'
}

const PROJECTS: Project[] = [
  {
    title: '3D Portfolio',
    desc: 'Portfolio cá nhân với thẻ sinh viên 3D, dây đeo lanyard vật lý có thể kéo thả, đung đưa như con lắc.',
    tags: ['Next.js', 'Three.js', 'Framer Motion'],
    icon: '🧊',
    gradient: 'from-blue-600/30 via-purple-600/20 to-transparent',
    type: '3d',
  },
  {
    title: 'UI Component Library',
    desc: 'Bộ component shadcn/ui tùy biến: Spotlight, Card 3D, Spline lazy-load, các hiệu ứng hover mượt mà.',
    tags: ['React', 'shadcn', 'Tailwind'],
    icon: '🎨',
    gradient: 'from-pink-600/30 via-rose-600/15 to-transparent',
    type: 'web',
  },
  {
    title: 'Learning App — LTDD',
    desc: 'Ứng dụng Android học lập trình di động với kiến trúc phân lớp, Gradle, view binding và navigation.',
    tags: ['Android', 'Kotlin', 'Gradle'],
    icon: '🤖',
    gradient: 'from-emerald-600/30 via-teal-600/15 to-transparent',
    type: 'mobile',
  },
  {
    title: 'Interactive 3D Scene',
    desc: 'Khám phá scene Spline 3D nhúng trong React với code-splitting, lazy loading và loading state.',
    tags: ['Spline', 'React', '3D'],
    icon: '🚀',
    gradient: 'from-amber-600/30 via-orange-600/15 to-transparent',
    type: '3d',
  },
  {
    title: 'Web Game & Motion',
    desc: 'Các demo chuyển động: spotlight theo chuột, gradient shift, marquee — kỹ thuật animation hiện đại.',
    tags: ['Framer Motion', 'CSS', 'JS'],
    icon: '⚡',
    gradient: 'from-cyan-600/30 via-sky-600/15 to-transparent',
    type: 'web',
  },
  {
    title: 'Backend & API',
    desc: 'REST API với Node/Express + MongoDB: auth, CRUD, middleware — nền tảng cho các dự án fullstack.',
    tags: ['Node.js', 'Express', 'MongoDB'],
    icon: '🛠️',
    gradient: 'from-violet-600/30 via-indigo-600/15 to-transparent',
    type: 'web',
  },
]

const icons = {
  web: 'layout',
  mobile: 'smartphone',
  '3d': 'cube',
}

export function ProjectsSection() {
  return (
    <section id="du-an" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
      {/* section header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
          <FlatIcon name="globe" className="h-3.5 w-3.5" />
          Dự án
        </span>
        <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Một số <span className="text-gradient">dự án</span> tiêu biểu
        </h2>
        <p className="mt-4 max-w-xl text-neutral-400">
          Những gì mình đã làm, học hỏi và thử nghiệm — từ giao diện đến 3D tương tác.
        </p>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => {
          return (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              data-cursor
              className="card-lift group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              {/* cover */}
              <div className={`relative h-32 bg-gradient-to-br ${p.gradient} p-5`}>
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.14),transparent_60%)]" />
                <span className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/5 blur-xl transition-transform duration-500 group-hover:scale-150" />
                <span className="relative text-4xl drop-shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  {p.icon}
                </span>
                <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-black/40 text-neutral-300 backdrop-blur-sm">
                  <FlatIcon name={icons[p.type]} className="h-4 w-4" />
                </span>
              </div>

              {/* body */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                  {p.title}
                  <FlatIcon name="up-right" className="h-4 w-4 text-neutral-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-400" />
                </h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-neutral-400">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-medium text-neutral-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* hover glow border */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-500 group-hover:border-blue-400/30" />
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}