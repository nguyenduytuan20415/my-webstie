'use client'

import { motion } from 'framer-motion'
import { Mascot } from '@/components/ui/mascot'
import { FlatIcon } from '@/components/ui/flat-icon'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

const EmailIcon = (p: { className?: string }) => <FlatIcon name="email" {...p} />

const SOCIALS = [
  {
    label: 'Email',
    value: 'nguyenduynttuan2004@gmail.com',
    href: 'mailto:nguyenduynttuan2004@gmail.com',
    icon: EmailIcon,
  },
  {
    label: 'GitHub',
    value: 'github.com/nguyenduynttuan',
    href: 'https://github.com/nguyenduynttuan',
    icon: GithubIcon,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/nguyenduynttuan',
    href: 'https://linkedin.com/in/nguyenduynttuan',
    icon: LinkedinIcon,
  },
]

export function ContactSection() {
  return (
    <section id="lien-he" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 pb-28 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-950/60 via-[#0a0b10] to-purple-950/40 px-6 py-14 sm:px-12"
      >
        {/* decor — radial-gradient glow, no blur filter */}
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 animate-float-slow"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0) 70%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 animate-float-slower"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, rgba(168,85,247,0) 70%)' }}
        />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-pink-300">
              <FlatIcon name="paper-plane" className="h-3.5 w-3.5" />
              Liên hệ
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Hãy cùng nhau <span className="text-gradient">tạo điều gì đó</span> tuyệt vời
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-neutral-400">
              Mình luôn sẵn sàng cho các dự án thú vị, cơ hội thực tập, hợp tác học tập
              hoặc chỉ đơn giản là một cuộc trò chuyện về công nghệ.
            </p>

            <div className="mt-8 space-y-3">
              {SOCIALS.map((s, i) => {
                const Icon = s.icon
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    data-cursor
                    className="group flex w-fit items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/10"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-neutral-300 transition-colors group-hover:text-blue-300">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <span className="text-sm text-neutral-300">{s.label}</span>
                    <span className="hidden text-xs text-neutral-500 sm:inline">{s.value}</span>
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* info card */}
          <div className="space-y-4">
            {[
              { icon: 'map-pin', label: 'Địa điểm', value: 'TP. Hồ Chí Minh, Việt Nam' },
              { icon: 'phone', label: 'Trường', value: 'Đại học Văn Hiến' },
              { icon: 'email', label: 'MSSV', value: '231A010702' },
            ].map((row) => {
              return (
                <div
                  key={row.label}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-300">
                    <FlatIcon name={row.icon} className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
                      {row.label}
                    </p>
                    <p className="text-sm font-medium text-white">{row.value}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* footer */}
      <footer className="mt-16 flex flex-col gap-4 border-t border-white/5 pt-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()}{' '}
            <span className="font-semibold text-neutral-200">Nguyễn Duy Tuấn</span> — Sinh viên Đại học Văn Hiến
          </p>
          <p className="flex items-center gap-2 text-xs text-neutral-400">
            Made with <span className="text-pink-400">♥</span> &{' '}
            <span className="text-gradient font-semibold">Next.js + Tailwind + Framer Motion</span>
            <span className="ml-1 inline-block" style={{ animation: 'float-slow 5s ease-in-out infinite' }}>
              <Mascot name="cat" size={34} ariaLabel="Mèo" />
            </span>
          </p>
        </div>
        <p className="text-center text-[11px] text-neutral-400">
          Icons by{' '}
          <a
            href="https://www.flaticon.com"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-neutral-500 underline-offset-2 transition-colors hover:text-blue-300"
          >
            Flaticon
          </a>
        </p>
      </footer>
    </section>
  )
}