import { BRANCHES } from '../data/branches'

function DetailRow({ label, children, span }) {
  return (
    <div className={`bg-cotton p-4 ${span ? 'sm:col-span-2' : ''}`}>
      <div className="track text-ink/35">{label}</div>
      <div className="mt-1.5 font-mono text-[11px] leading-relaxed text-ink/85">{children}</div>
    </div>
  )
}

export default function BranchExplorer({ branchId, onChange }) {
  const active = BRANCHES.find((b) => b.id === branchId) ?? BRANCHES[0]

  return (
    <section id="branches" className="hair-t">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 py-10">
          <div>
            <div className="track text-terracotta">Branch explorer / 04 kitchens</div>
            <h2 className="mt-3 max-w-[26ch] font-display text-3xl font-light leading-[1.02] tracking-tightest sm:text-5xl">
              Four kitchens, one <em className="italic text-ochre">stone-ground</em> batter.
            </h2>
          </div>
          <p className="max-w-[34ch] text-[13.5px] leading-relaxed text-ink/60">
            Verified Google Maps listings — addresses, plus codes, hours, direct lines and the review
            lines guests left behind.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-iron/15 lg:grid-cols-12">
          <div className="bg-cotton lg:col-span-4">
            {BRANCHES.map((branch, i) => {
              const on = branch.id === active.id
              return (
                <button
                  key={branch.id}
                  type="button"
                  onClick={() => onChange(branch.id)}
                  aria-pressed={on}
                  className={`relative block w-full border-b border-iron/15 px-4 py-5 text-left transition-colors last:border-b-0 ${
                    on ? 'bg-dal' : 'hover:bg-dal/50'
                  }`}
                >
                  {on && <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-terracotta" />}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-mono text-[9.5px] text-ink/40">{String(i + 1).padStart(2, '0')}</div>
                      <div className="mt-1.5 font-display text-[19px] leading-tight tracking-tightest">
                        {branch.name}
                      </div>
                      <div className="mt-1 font-telugu text-[11px] text-ink/45">{branch.telugu}</div>
                      <div className="mt-2.5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-ink/45">
                        {branch.role}
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="font-mono text-[11px] text-ochre">{branch.rating}</div>
                      <div className="mt-1 font-mono text-[9px] text-ink/35">{branch.reviews.split('·')[0].trim()}</div>
                    </div>
                  </div>
                </button>
              )
            })}

            <div className="hair-t px-4 py-4">
              <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink/35">
                Kitchen hours · {active.short}
              </div>
              <div className="mt-1.5 font-mono text-[11px] text-ink/80">{active.hours}</div>
            </div>
          </div>

          <div className="bg-dal/40 lg:col-span-8">
            <div className="border-b border-iron/15 px-4 py-5 sm:px-6 sm:py-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="track text-terracotta">{active.role}</div>
                  <h3 className="mt-2 font-display text-[26px] font-light leading-tight tracking-tightest sm:text-[34px]">
                    {active.name}
                  </h3>
                  <div className="mt-1 font-telugu text-[13px] text-ink/55">{active.telugu}</div>
                </div>
                <div className="shrink-0 border border-iron/20 px-3 py-2 text-right">
                  <div className="font-display text-xl leading-none text-ochre">{active.rating}</div>
                  <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-ink/40">
                    {active.reviews}
                  </div>
                </div>
              </div>

              {active.specialty && (
                <div className="mt-4 inline-flex items-center gap-2 border border-terracotta/40 px-2.5 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-terracotta">
                    Speciality · {active.specialty}
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-px bg-iron/15 sm:grid-cols-2">
              <DetailRow label="Address" span>
                {active.address}
              </DetailRow>
              <DetailRow label="Plus code">{active.plusCode ?? 'Not published on listing'}</DetailRow>
              <DetailRow label="Coordinates">
                {active.coords ? (
                  <>
                    {active.coords}
                    <span className="mt-1 block text-[9.5px] text-ink/40">{active.dms}</span>
                  </>
                ) : (
                  'Not published on listing'
                )}
              </DetailRow>
              <DetailRow label="Operating hours">{active.hours}</DetailRow>
              <DetailRow label="Direct phone">
                <a
                  href={`tel:${active.phone.replace(/\s/g, '')}`}
                  className="underline decoration-iron/20 underline-offset-4 transition-colors hover:text-terracotta"
                >
                  {active.phone}
                </a>
              </DetailRow>
              <DetailRow label="Price band">{active.price}</DetailRow>
              <DetailRow label="Token prefix">{active.tokenPrefix} · verified kitchen pass</DetailRow>
            </div>

            <div className="border-t border-iron/15 px-4 py-5 sm:px-6">
              <div className="track text-ink/35">Service attributes</div>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {active.attributes.length ? (
                  active.attributes.map((attribute) => (
                    <span
                      key={attribute}
                      className="border border-iron/15 bg-cotton px-2 py-1 font-mono text-[9px] uppercase tracking-[0.06em] text-ink/60"
                    >
                      {attribute}
                    </span>
                  ))
                ) : (
                  <span className="font-mono text-[10px] text-ink/40">Not published on listing</span>
                )}
              </div>
            </div>

            <div className="border-t border-iron/15 px-4 py-5 sm:px-6">
              <div className="track text-ink/35">From the Google listing</div>
              <div className="mt-3 space-y-4">
                {active.quotes.map((quote, i) => (
                  <blockquote key={i} className="max-w-[62ch]">
                    <p className="font-display text-[17px] italic leading-snug text-ink/85 sm:text-[19px]">
                      “{quote.text}”
                    </p>
                    <footer className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink/40">
                      {quote.author} · {quote.meta} · {quote.date}
                    </footer>
                  </blockquote>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <a
                  href={`tel:${active.phone.replace(/\s/g, '')}`}
                  className="bg-iron px-4 py-2.5 text-cotton transition-colors hover:bg-terracotta"
                >
                  <span className="track">Call kitchen · {active.phone}</span>
                </a>
                {active.maps && (
                  <a
                    href={active.maps}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-iron/30 px-4 py-2.5 transition-colors hover:border-iron hover:bg-cotton"
                  >
                    <span className="track text-ink/70">Open in Google Maps ↗</span>
                  </a>
                )}
                {!active.maps && active.plusCode && (
                  <span className="border border-iron/20 px-3 py-2.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink/45">
                    Plus code · {active.plusCode}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
