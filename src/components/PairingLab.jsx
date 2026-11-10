import { PAIRINGS } from '../data/pairings'

export default function PairingLab({ dish, selected, onToggle, onClear }) {
  const matched = new Set(dish.pairings)

  return (
    <section id="pairings" className="bg-iron text-cotton">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="py-10 lg:col-span-4 lg:hair-r lg:border-cotton/15 lg:pr-10 lg:py-12">
            <div className="track text-brass">Pairing lab / 06 accompaniments</div>
            <h2 className="mt-4 font-display text-3xl font-light leading-[1.03] tracking-tightest sm:text-[2.7rem]">
              Chutney, podi <em className="italic text-brass">&amp;</em> sambar — matched by the chef.
            </h2>
            <p className="mt-5 max-w-[42ch] text-[13.5px] leading-[1.75] text-cotton/60">
              Six stone-ground accompaniments rotate through the morning. Selecting a tiffin lights the
              pairings the kitchen sends with it; tap any card to load it onto your tray.
            </p>

            <div className="mt-7 border border-cotton/15 p-4">
              <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cotton/35">
                Chef pairing for
              </div>
              <div className="mt-1 font-display text-lg leading-tight">
                {dish.num} · {dish.name}
              </div>
              <div className="mt-1 font-telugu text-[11px] text-cotton/45">{dish.telugu}</div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {dish.pairings.map((id) => (
                  <span
                    key={id}
                    className="border border-brass/40 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-brass"
                  >
                    {PAIRINGS.find((p) => p.id === id)?.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] text-cotton/40">
                TRAY ACCOMPANIMENTS · {String(selected.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={onClear}
                disabled={!selected.length}
                className="font-mono text-[10px] uppercase tracking-[0.12em] text-cotton/50 underline decoration-cotton/25 underline-offset-4 transition-colors hover:text-brass disabled:cursor-not-allowed disabled:opacity-30"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-px bg-cotton/15 sm:grid-cols-2 xl:grid-cols-3">
              {PAIRINGS.map((pairing, i) => {
                const isMatch = matched.has(pairing.id)
                const isOn = selected.includes(pairing.id)
                return (
                  <button
                    key={pairing.id}
                    type="button"
                    onClick={() => onToggle(pairing.id)}
                    aria-pressed={isOn}
                    className={`relative flex flex-col bg-iron p-5 text-left transition-colors ${
                      isOn ? 'bg-[#242019]' : 'hover:bg-[#1c1916]'
                    }`}
                  >
                    {isMatch && <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-brass" />}
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-mono text-[10px] text-cotton/30">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`grid h-4 w-4 shrink-0 place-items-center border text-[9px] leading-none ${
                          isOn ? 'border-brass bg-brass text-iron' : 'border-cotton/25 text-transparent'
                        }`}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-[19px] leading-snug text-cotton">{pairing.name}</h3>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-cotton/50">{pairing.note}</p>
                    <div className="mt-4 flex items-center gap-2 pt-3">
                      {isMatch ? (
                        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-brass">
                          Chef pairing · {dish.num}
                        </span>
                      ) : (
                        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-cotton/25">
                          House staple
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
