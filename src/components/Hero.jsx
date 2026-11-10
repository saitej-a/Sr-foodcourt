import { DISHES } from '../data/dishes'
import { CAMERA_PRESETS } from './ThaliStage'
import ThaliStage from './ThaliStage'
import LiveCustomizer from './LiveCustomizer'

const MARQUEE = [
  'దోశ',
  'ఇడ్లీ',
  'వడ',
  'పూరీ',
  'బోండా',
  'ఉతప్పం',
  'ఉప్మా',
  'STONE-GROUND BEFORE DAWN',
  'SEALED ON CAST IRON',
  'PURE COW GHEE',
  'SEVEN SIGNATURES',
  'SH 7 · VELGATOOR',
]

function Marquee() {
  return (
    <div className="overflow-hidden bg-brass text-iron">
      <div className="marquee-track">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {MARQUEE.map((word, i) => (
              <span key={`${half}-${i}`} className="flex shrink-0 items-center">
                <span
                  className={`px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] ${
                    i < 7 ? 'font-telugu text-[13px] tracking-normal' : 'font-mono'
                  }`}
                >
                  {word}
                </span>
                <span className="text-[9px] opacity-50">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Hero({
  branch,
  dish,
  roast,
  sambar,
  onDish,
  onRoast,
  onSambar,
  onAdd,
  preset,
  onPreset,
  autoOrbit,
  onAutoOrbit,
  steamHigh,
  onSteam,
}) {
  return (
    <section id="top" className="relative">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="py-8 lg:col-span-5 lg:hair-r lg:py-10 lg:pr-8 xl:pr-12">
            <div className="flex items-center gap-3">
              <span className="track shrink-0 text-terracotta">{branch.telugu}</span>
              <span className="h-px flex-1 bg-iron/15" />
              <span className="track shrink-0 text-ink/40">Flagship / 04</span>
            </div>

            <h1 className="mt-6 font-display text-[2.55rem] font-light leading-[0.94] tracking-tightest sm:text-[3.4rem] xl:text-[4.1rem]">
              Seven tiffins,
              <br />
              <em className="italic text-ochre">stone-ground</em>
              <br />
              before the highway wakes.
            </h1>

            <p className="mt-6 max-w-[46ch] text-[14.5px] leading-[1.75] text-ink/75">
              From a single seasoned griddle on State Highway 7 in Velgatoor to four kitchens across
              Telangana — dosa, idli, vada, bonda, uthappa, upma and puri, ladled by hand, sealed on cast
              iron and finished with pure cow ghee.
            </p>

            <dl className="mt-7 grid grid-cols-2 gap-px bg-iron/15">
              <div className="col-span-2 bg-cotton p-3">
                <dt className="track text-ink/40">Plus code</dt>
                <dd className="mt-1 font-mono text-[11px] leading-relaxed text-ink/85">
                  {branch.plusCode ?? 'Not published on listing'}
                </dd>
              </div>
              <div className="col-span-2 bg-cotton p-3">
                <dt className="track text-ink/40">Coordinates</dt>
                <dd className="mt-1 font-mono text-[11px] leading-relaxed text-ink/85">
                  {branch.coords ?? 'Not published on listing'}
                </dd>
              </div>
              <div className="bg-cotton p-3">
                <dt className="track text-ink/40">Hours</dt>
                <dd className="mt-1 font-mono text-[11px] leading-relaxed text-ink/85">
                  {branch.hours.replace('Monday – Sunday · ', 'Daily · ')}
                </dd>
              </div>
              <div className="bg-cotton p-3">
                <dt className="track text-ink/40">Direct line</dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${branch.phone.replace(/\s/g, '')}`}
                    className="font-mono text-[11px] text-ink/85 underline decoration-iron/20 underline-offset-4 transition-colors hover:text-terracotta"
                  >
                    {branch.phone}
                  </a>
                </dd>
              </div>
              <div className="bg-cotton p-3">
                <dt className="track text-ink/40">Price band</dt>
                <dd className="mt-1 font-mono text-[11px] text-ink/85">{branch.price}</dd>
              </div>
              <div className="bg-cotton p-3">
                <dt className="track text-ink/40">Rating</dt>
                <dd className="mt-1 font-mono text-[11px] text-ink/85">
                  {branch.rating} <span className="text-ink/40">· {branch.reviews.split('·')[0].trim()}</span>
                </dd>
              </div>
            </dl>

            <LiveCustomizer
              dish={dish}
              roast={roast}
              sambar={sambar}
              onRoast={onRoast}
              onSambar={onSambar}
              onAdd={onAdd}
            />
          </div>

          <div className="lg:col-span-7">
            <div className="overflow-hidden bg-iron lg:pl-8 xl:pl-12">
              <div className="relative h-[400px] sm:h-[500px] lg:h-[560px] xl:h-[620px]">
                <ThaliStage
                  activeDish={dish.id}
                  warm={branch.warm}
                  warmIntensity={branch.warmIntensity}
                  preset={preset}
                  autoOrbit={autoOrbit}
                  steamHigh={steamHigh}
                />

                <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 sm:p-5">
                  <div>
                    <div className="track text-brass/80">WebGL · Brass thali</div>
                    <div className="mt-1 font-mono text-[10px] text-cotton/35">LIVE / 07 SIGNATURES</div>
                  </div>
                  <div className="pointer-events-auto flex flex-col items-end gap-1.5">
                    <button
                      type="button"
                      onClick={onAutoOrbit}
                      className={`hair-dark px-2.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] transition-colors ${
                        autoOrbit ? 'bg-brass text-iron' : 'text-cotton/60 hover:text-cotton'
                      }`}
                    >
                      Auto-orbit {autoOrbit ? 'on' : 'off'}
                    </button>
                    <button
                      type="button"
                      onClick={onSteam}
                      className="hair-dark px-2.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-cotton/60 transition-colors hover:text-cotton"
                    >
                      Steam · {steamHigh ? 'High' : 'Subtle'}
                    </button>
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {Object.entries(CAMERA_PRESETS).map(([key, value]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => onPreset(key)}
                          className={`hair-dark px-2 py-1.5 font-mono text-[9.5px] leading-none tracking-[0.06em] transition-colors ${
                            preset === key
                              ? 'bg-cotton text-iron'
                              : 'bg-iron/60 text-cotton/70 backdrop-blur-[2px] hover:border-cotton/40 hover:text-cotton'
                          }`}
                        >
                          {value.label}
                        </button>
                      ))}
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-[10px] text-brass">
                        {dish.num} / 07
                      </div>
                      <div className="font-display text-[17px] leading-tight text-cotton">{dish.name}</div>
                      <div className="font-telugu text-[11px] text-cotton/45">{dish.telugu}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-7 border-t border-cotton/15">
                {DISHES.map((item) => {
                  const on = item.id === dish.id
                  const short = item.name.split(' ').pop()
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onDish(item.id)}
                      aria-pressed={on}
                      className={`group border-cotton/10 px-1 py-2.5 text-center transition-colors first:border-l-0 [&:not(:first-child)]:border-l ${
                        on ? 'bg-cotton text-iron' : 'text-cotton/55 hover:bg-cotton/10 hover:text-cotton'
                      }`}
                    >
                      <span
                        className={`block font-mono text-[9px] ${on ? 'text-terracotta' : 'text-brass/70'}`}
                      >
                        {item.num}
                      </span>
                      <span className="mt-1 block truncate text-[9.5px] uppercase tracking-[0.08em]">
                        {short}
                      </span>
                    </button>
                  )
                })}
              </div>

              <Marquee />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
