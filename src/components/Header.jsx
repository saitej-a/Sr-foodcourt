import { useEffect, useState } from 'react'
import { BRANCHES } from '../data/branches'

const NAV = [
  { label: 'Signatures', href: '#signatures' },
  { label: 'Pairing Lab', href: '#pairings' },
  { label: 'Branches', href: '#branches' },
]

export default function Header({ branchId, onBranch, trayCount, onOpenTray }) {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 3800)
    return () => clearInterval(id)
  }, [])

  const ticker = BRANCHES[tick % BRANCHES.length]
  const active = BRANCHES.find((b) => b.id === branchId) ?? BRANCHES[0]

  return (
    <header className="sticky top-0 z-50 bg-cotton/95 backdrop-blur-[3px]">
      <div className="hair-b">
        <div className="mx-auto flex max-w-[1600px] items-stretch px-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3 py-2.5 pr-4 lg:hair-r lg:pr-7">
            <span className="grid h-9 w-9 shrink-0 place-items-center bg-iron font-display text-[13px] font-semibold tracking-tight text-cotton">
              SR
            </span>
            <span className="leading-none">
              <span className="block font-display text-[15px] font-semibold tracking-tightest">S R Food Court</span>
              <span className="mt-1 block font-telugu text-[10px] leading-none text-ink/55">S R ఫుడ్ కోర్ట్</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 pl-7 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="track text-ink/60 transition-colors hover:text-terracotta"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <label className="hidden items-center gap-2 sm:flex">
              <span className="track text-ink/40">Kitchen</span>
              <span className="relative">
                <select
                  value={branchId}
                  onChange={(e) => onBranch(e.target.value)}
                  className="hair appearance-none bg-transparent py-1.5 pl-2.5 pr-7 font-mono text-[11px] uppercase tracking-[0.08em] text-iron outline-none focus:border-ochre"
                  aria-label="Choose a kitchen branch"
                >
                  {BRANCHES.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.short}
                    </option>
                  ))}
                </select>
                <span aria-hidden="true" className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[9px] text-ink/50">
                  ▾
                </span>
              </span>
            </label>

            <button
              type="button"
              onClick={onOpenTray}
              className="group flex items-center gap-2 bg-iron px-3.5 py-2.5 text-cotton transition-colors hover:bg-terracotta sm:px-4"
            >
              <span className="track text-cotton/60 group-hover:text-cotton/80">Tray</span>
              <span className="font-mono text-[11px] tabular-nums text-brass">
                {String(trayCount).padStart(2, '0')}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-iron text-cotton">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-1.5 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-brass" />
            <span className="track shrink-0 text-brass">Now serving</span>
            <span key={tick} className="tint truncate font-telugu text-[11px] text-cotton/90">
              {ticker.telugu}
            </span>
            <span className="hidden shrink-0 truncate font-mono text-[10px] text-cotton/40 md:inline">
              {ticker.name} · {ticker.hours.replace('Monday – Sunday · ', '')}
            </span>
          </div>
          <div className="hidden shrink-0 items-center gap-4 sm:flex">
            <span className="track text-cotton/35">Direct line</span>
            <a
              href={`tel:${ticker.phone.replace(/\s/g, '')}`}
              className="font-mono text-[10px] tracking-[0.06em] text-cotton/80 transition-colors hover:text-brass"
            >
              {ticker.phone}
            </a>
            <span className="hidden font-mono text-[10px] text-cotton/25 lg:inline">
              {active.rating}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
