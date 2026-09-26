'use client'

import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Spotlight } from '@/components/ui/spotlight'
import { Mascot } from '@/components/ui/mascot'

const SplineScene = lazy(() => import('@/components/ui/splite').then((m) => ({ default: m.SplineScene })))

export function Interactive3DSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mountSpline, setMountSpline] = useState(false)

  // Chỉ tải scene Spline khi người dùng cuộn gần tới section —
  // không kéo payload/WebGL nặng vào lần load đầu tiên (below-the-fold).
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setMountSpline(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMountSpline(true)
          io.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="mx-auto max-w-6xl px-5 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* md+: cố định chiều cao ngang; mobile: chiều cao tự động theo nội dung (không bị clip) */}
        <Card className="relative w-full overflow-hidden border-none bg-black/[0.96] md:h-[520px]">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />

          {/* rái cá coi 3D scene */}
          <div className="pointer-events-none absolute bottom-3 left-5 z-20 hidden sm:block" style={{ animation: 'float-slow 6.5s ease-in-out infinite' }}>
            <Mascot name="otter" size={88} className="drop-shadow-[0_10px_14px_rgba(0,0,0,0.4)]" ariaLabel="Rái cá" />
          </div>

          <div className="flex h-full flex-col md:flex-row">
            {/* left content */}
            <div className="relative z-10 flex flex-col justify-center p-8 md:flex-1 md:p-12">
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                ✦ Interactive 3D
              </span>
              <h2 className="bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl bg-gradient-to-b from-neutral-50 to-neutral-400">
                Trải nghiệm 3D
                <br />
                sống động
              </h2>
              <p className="mt-5 max-w-md text-neutral-300">
                Scene Spline tương tác nhúng ngay trong React — lazy-load, code-splitting,
                orbit & zoom chuột. Di chuyển chuột xung quanh để khám phá.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-[11px] text-neutral-500">
                <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1">🖱️ Kéo để xoay</span>
                <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1">🔍 Scroll để zoom</span>
              </div>
            </div>

            {/* right: spline scene */}
            <div className="relative h-72 md:h-auto md:flex-1">
              <Suspense
                fallback={
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <span className="h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                      <span className="text-xs text-neutral-500">Đang tải scene 3D…</span>
                    </div>
                  </div>
                }
              >
                {mountSpline && (
                  <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="h-full w-full"
                  />
                )}
              </Suspense>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  )
}