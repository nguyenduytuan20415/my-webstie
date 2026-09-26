'use client'

import { Mascot } from '@/components/ui/mascot'

/**
 * HeroPets — the koboyo mascot squad scattered around the student card.
 * Each character looks at the cursor (head turns to 8 directions) and can be
 * poked: it blinks → blows a heart → sparkles, and spins dizzy after 4 quick
 * pokes. All wrappers are pointer-events-none so the card drag keeps working.
 */
export function HeroPets() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      {/* cáo ngồi cạnh móc treo dây đeo */}
      <div
        className="pointer-events-auto absolute right-2 top-0 hidden sm:block"
        style={{ animation: 'float-slow 6s ease-in-out infinite' }}
      >
        <Mascot name="fox" size={112} className="drop-shadow-[0_10px_16px_rgba(0,0,0,0.35)]" />
      </div>

      {/* chim cánh cụt nhún nhảy phía dưới */}
      <div className="pointer-events-auto absolute bottom-0 right-8">
        <div className="animate-pet-hop">
          <Mascot name="penguin" size={92} className="drop-shadow-[0_8px_12px_rgba(0,0,0,0.35)]" />
        </div>
      </div>

      {/* hamster bên trái */}
      <div
        className="pointer-events-auto absolute bottom-2 left-2 hidden md:block"
        style={{ animation: 'float-slow 7.5s ease-in-out infinite reverse' }}
      >
        <Mascot name="hamster" size={104} className="drop-shadow-[0_10px_16px_rgba(0,0,0,0.35)]" />
      </div>

      {/* gấu trúc đỏ đi tới đi lui */}
      <div className="pointer-events-auto absolute bottom-0 left-1/4 hidden sm:block">
        <div className="animate-pet-sidestep">
          <Mascot name="redpanda" size={96} className="drop-shadow-[0_8px_12px_rgba(0,0,0,0.35)]" />
        </div>
      </div>
    </div>
  )
}