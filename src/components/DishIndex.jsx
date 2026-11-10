import { useMemo, useState } from 'react'
import { CATEGORIES, DISHES } from '../data/dishes'
import { PAIRINGS } from '../data/pairings'

export default function DishIndex({ activeDish, onSelect }) {
  const [filter, setFilter] = useState(CATEGORIES[0])

  const visible = useMemo(
    () => (filter === CATEGORIES[0] ? DISHES : DISHES.filter((d) => d.category === filter)),
    [filter],
  )

  const pairingName = (id) => PAIRINGS.find((p) => p.id === id)?.name ?? id

  return (
    <section id="signatures" className="hair-t">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 py-10">
          <div>
            <div className="track text-terracotta">The seven / Menu index</div>
            <h2 className="mt-3 max-w-[24ch] font-display text-3xl font-light leading-[1.02] tracking-tightest sm:text-5xl">
              A morning menu that has <em className="italic text-ochre">never</em> needed a photograph.
            </h2>
          </div>
          <p className="max-w-[38ch] text-[13.5px] leading-relaxed text-ink/60">
            Each plate is built the same way every dawn: wet-stone batter, a seasoned tawa, and ghee
            measured by hand. Select a tiffin to pull it to the front of the brass thali.
          </p>
        </div>

        <div className="hair-t hair-b">
          <div className="no-scrollbar flex gap-px overflow-x-auto bg-iron/15">
            {CATEGORIES.map((category) => {
              const on = category === filter
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  aria-pressed={on}
                  className={`shrink-0 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
                    on ? 'bg-iron text-cotton' : 'bg-cotton text-ink/55 hover:bg-dal hover:text-ink'
                  }`}
                >
                  {category}
                </button>
              )
            })}
            <span aria-hidden="true" className="flex-1 bg-cotton" />
          </div>

          {visible.map((dish) => {
            const on = dish.id === activeDish
            return (
              <button
                key={dish.id}
                type="button"
                onClick={() => onSelect(dish.id)}
                aria-pressed={on}
                className={`group relative block w-full border-t border-iron/15 px-1 py-6 text-left transition-colors ${
                  on ? 'bg-dal' : 'hover:bg-dal/50'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-0 left-0 w-[3px] transition-colors ${
                    on ? 'bg-ochre' : 'bg-transparent group-hover:bg-iron/20'
                  }`}
                />
                <span className="grid grid-cols-12 items-start gap-x-4 gap-y-3 sm:gap-x-6">
                  <span className="col-span-2 pl-3 sm:col-span-1 sm:pl-4">
                    <span className="block font-mono text-[11px] text-ink/40">{dish.num}</span>
                    <span
                      className="mt-3 block h-8 w-8 border border-iron/20"
                      style={{ backgroundColor: dish.swatch }}
                      aria-hidden="true"
                    />
                  </span>

                  <span className="col-span-10 sm:col-span-4">
                    <span className="track block text-ochre">{dish.badge}</span>
                    <span className="mt-2 block font-display text-[22px] font-normal leading-tight tracking-tightest sm:text-[25px]">
                      {dish.name}
                    </span>
                    <span className="mt-1 block font-telugu text-[12px] text-ink/50">{dish.telugu}</span>
                    <span className="mt-3 inline-block border border-iron/20 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink/55">
                      {dish.category}
                    </span>
                  </span>

                  <span className="col-span-12 sm:col-span-4">
                    <span className="block max-w-[52ch] text-[13px] leading-[1.7] text-ink/70">
                      {dish.craft}
                    </span>
                  </span>

                  <span className="col-span-12 sm:col-span-3 sm:pl-2">
                    <span className="track block text-ink/35">On the brass</span>
                    <span className="mt-1.5 block text-[12px] leading-relaxed text-ink/60">{dish.form}</span>
                    <span className="mt-3 block font-mono text-[9.5px] leading-relaxed text-ink/45">
                      {dish.pairings.map(pairingName).join(' / ')}
                    </span>
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
