import { useEffect } from 'react'
import { ARRIVAL_WINDOWS, DISHES, SERVICES } from '../data/dishes'
import { PAIRINGS } from '../data/pairings'

const BARCODE = [2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 1, 3, 2, 1, 2, 3, 1, 4, 1, 2, 3, 1, 1, 2]

function Barcode() {
  return (
    <div aria-hidden="true" className="flex h-8 items-end gap-[2px]">
      {BARCODE.map((w, i) => (
        <span
          key={i}
          className="block h-full bg-iron"
          style={{ width: `${w}px`, opacity: i % 3 === 0 ? 0.85 : 0.6 }}
        />
      ))}
    </div>
  )
}

export default function TrayDrawer({
  open,
  onClose,
  tray,
  onInc,
  onDec,
  onClear,
  chutneys,
  onToggleChutney,
  branch,
  service,
  onService,
  arrival,
  onArrival,
  guest,
  onGuest,
  onGenerate,
  token,
  onResetToken,
}) {
  useEffect(() => {
    if (!open) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const count = tray.reduce((n, item) => n + item.qty, 0)
  const canGenerate = Boolean(guest.trim()) && tray.length > 0

  return (
    <div
      className={`fixed inset-0 z-[60] ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-iron/60 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Morning tiffin tray and kitchen token"
        className={`absolute right-0 top-0 flex h-full w-full flex-col bg-cotton shadow-[-24px_0_60px_rgba(0,0,0,0.25)] transition-transform duration-300 sm:max-w-[480px] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="hair-b flex items-start justify-between gap-4 bg-cotton px-4 py-4 sm:px-5">
          <div>
            <div className="track text-terracotta">Morning tiffin tray</div>
            <h2 className="mt-1.5 font-display text-2xl font-light leading-tight tracking-tightest">
              {token ? 'Kitchen token' : 'Your tray'}
            </h2>
            <div className="mt-1 font-mono text-[10px] text-ink/45">
              {branch.short.toUpperCase()} · {String(count).padStart(2, '0')} TIFFINS ·{' '}
              {String(chutneys.length).padStart(2, '0')} ACCOMPANIMENTS
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close tray"
            className="hair grid h-8 w-8 shrink-0 place-items-center text-[13px] text-ink/60 transition-colors hover:border-iron hover:text-iron"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {token ? (
            <div className="rise">
              <div className="bg-iron px-4 py-5 text-cotton sm:px-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="track text-brass">Verified kitchen pass</span>
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brass" />
                </div>
                <div className="mt-3 font-mono text-[30px] leading-none tracking-[0.06em] text-cotton">
                  {token.id}
                </div>
                <div className="mt-2 font-mono text-[10px] text-cotton/45">
                  ISSUED {token.issued.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ·{' '}
                  {token.branch.short.toUpperCase()}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px bg-iron/15">
                <div className="bg-cotton p-3.5">
                  <div className="track text-ink/35">Guest</div>
                  <div className="mt-1 font-mono text-[11px] text-ink/85">{token.guest}</div>
                </div>
                <div className="bg-cotton p-3.5">
                  <div className="track text-ink/35">Arrival</div>
                  <div className="mt-1 font-mono text-[11px] text-ink/85">{token.arrival}</div>
                </div>
                <div className="col-span-2 bg-cotton p-3.5">
                  <div className="track text-ink/35">Service option</div>
                  <div className="mt-1 font-mono text-[11px] text-ink/85">{token.service}</div>
                </div>
                <div className="col-span-2 bg-cotton p-3.5">
                  <div className="track text-ink/35">Kitchen</div>
                  <div className="mt-1 font-display text-[15px] leading-tight">{token.branch.name}</div>
                  <div className="mt-1 font-telugu text-[10.5px] text-ink/50">{token.branch.telugu}</div>
                  <div className="mt-2 font-mono text-[10px] leading-relaxed text-ink/60">
                    {token.branch.address}
                  </div>
                </div>
                <div className="bg-cotton p-3.5">
                  <div className="track text-ink/35">Hours</div>
                  <div className="mt-1 font-mono text-[10px] leading-relaxed text-ink/85">
                    {token.branch.hours.replace('Monday – Sunday · ', 'Daily · ')}
                  </div>
                </div>
                <div className="bg-cotton p-3.5">
                  <div className="track text-ink/35">Price band</div>
                  <div className="mt-1 font-mono text-[10px] text-ink/85">{token.branch.price}</div>
                </div>
                <div className="col-span-2 bg-cotton p-3.5">
                  <div className="track text-ink/35">Direct line</div>
                  <a
                    href={`tel:${token.branch.phone.replace(/\s/g, '')}`}
                    className="mt-1 block font-mono text-[11px] text-ink/85 underline decoration-iron/20 underline-offset-4 hover:text-terracotta"
                  >
                    {token.branch.phone}
                  </a>
                </div>
              </div>

              <div className="hair-t px-4 py-4 sm:px-5">
                <div className="track text-ink/35">On this token</div>
                <ul className="mt-2.5 space-y-2">
                  {token.items.map((item) => (
                    <li key={item.key} className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[12.5px] leading-snug text-ink/85">{item.dish.name}</div>
                        <div className="mt-0.5 font-mono text-[9.5px] leading-relaxed text-ink/45">
                          {item.roast} · {item.sambar}
                        </div>
                      </div>
                      <span className="font-mono text-[11px] text-ink/60">×{item.qty}</span>
                    </li>
                  ))}
                </ul>

                {token.chutneys.length > 0 && (
                  <>
                    <div className="track mt-4 text-ink/35">Accompaniments</div>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {token.chutneys.map((id) => (
                        <span
                          key={id}
                          className="border border-iron/15 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.06em] text-ink/60"
                        >
                          {PAIRINGS.find((p) => p.id === id)?.name}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                <div className="mt-5 flex items-end justify-between gap-3 border-t border-iron/15 pt-4">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink/35">
                      Total tiffins
                    </div>
                    <div className="mt-1 font-display text-3xl leading-none">{token.count}</div>
                  </div>
                  <Barcode />
                </div>
                <p className="mt-4 max-w-[44ch] text-[11px] leading-relaxed text-ink/45">
                  Show this pass at the counter. The token is tied to the {token.branch.short} kitchen and the
                  direct line above — no payment is taken on this website.
                </p>
              </div>
            </div>
          ) : (
            <div>
              {tray.length === 0 ? (
                <div className="px-4 py-10 text-center sm:px-5">
                  <div className="mx-auto grid h-12 w-12 place-items-center border border-iron/20 font-display text-lg text-ink/40">
                    ◌
                  </div>
                  <p className="mt-4 font-display text-lg leading-snug text-ink/70">
                    Nothing on the tray yet.
                  </p>
                  <p className="mx-auto mt-2 max-w-[30ch] text-[12px] leading-relaxed text-ink/50">
                    Pick one of the seven tiffins above, choose a ghee finish and a sambar serving, then add it
                    here.
                  </p>
                </div>
              ) : (
                <ul>
                  {tray.map((item) => {
                    const dish = DISHES.find((d) => d.id === item.dishId)
                    return (
                      <li key={item.key} className="hair-b px-4 py-4 sm:px-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="font-mono text-[9px] text-ink/35">{dish.num} / SIGNATURE</div>
                            <div className="mt-1 font-display text-[17px] leading-tight">{dish.name}</div>
                            <div className="mt-1 font-mono text-[9.5px] leading-relaxed text-ink/45">
                              {item.roast}
                              <br />
                              {item.sambar}
                            </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-px bg-iron/15">
                            <button
                              type="button"
                              onClick={() => onDec(item.key)}
                              aria-label={`Decrease ${dish.name}`}
                              className="grid h-8 w-8 place-items-center bg-cotton text-[14px] text-ink/60 transition-colors hover:bg-dal hover:text-iron"
                            >
                              −
                            </button>
                            <span className="grid h-8 w-9 place-items-center bg-cotton font-mono text-[11px] tabular-nums">
                              {String(item.qty).padStart(2, '0')}
                            </span>
                            <button
                              type="button"
                              onClick={() => onInc(item.key)}
                              aria-label={`Increase ${dish.name}`}
                              className="grid h-8 w-8 place-items-center bg-cotton text-[13px] text-ink/60 transition-colors hover:bg-dal hover:text-iron"
                            >
                              ＋
                            </button>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}

              {chutneys.length > 0 && (
                <div className="hair-b px-4 py-4 sm:px-5">
                  <div className="track text-ink/35">Tray accompaniments</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {chutneys.map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => onToggleChutney(id)}
                        className="group flex items-center gap-1.5 border border-iron/20 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.06em] text-ink/60 transition-colors hover:border-terracotta hover:text-terracotta"
                      >
                        {PAIRINGS.find((p) => p.id === id)?.name}
                        <span className="text-[10px] leading-none opacity-40 group-hover:opacity-100">✕</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {tray.length > 0 && (
                <div className="flex items-center justify-between px-4 py-3 sm:px-5">
                  <button
                    type="button"
                    onClick={onClear}
                    className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/45 underline decoration-iron/20 underline-offset-4 transition-colors hover:text-terracotta"
                  >
                    Clear tray
                  </button>
                  <span className="font-mono text-[10px] text-ink/40">{count} TIFFINS</span>
                </div>
              )}

              <div className="hair-t px-4 py-5 sm:px-5">
                <div className="track text-terracotta">Instant kitchen token</div>
                <h3 className="mt-1.5 font-display text-xl leading-tight tracking-tightest">
                  Morning arrival
                </h3>

                <div className="mt-4">
                  <div className="track text-ink/35">Service option</div>
                  <div className="mt-2 flex flex-col gap-px bg-iron/15">
                    {SERVICES.map((option) => {
                      const on = service === option
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => onService(option)}
                          aria-pressed={on}
                          className={`px-3 py-2.5 text-left font-mono text-[10.5px] tracking-[0.04em] transition-colors ${
                            on ? 'bg-iron text-cotton' : 'bg-cotton text-ink/65 hover:bg-dal'
                          }`}
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="track text-ink/35">Morning arrival window</div>
                  <div className="mt-2 grid grid-cols-3 gap-px bg-iron/15">
                    {ARRIVAL_WINDOWS.map((slot) => {
                      const on = arrival === slot
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => onArrival(slot)}
                          aria-pressed={on}
                          className={`px-1 py-2.5 font-mono text-[10px] tracking-[0.04em] transition-colors ${
                            on ? 'bg-ochre text-cotton' : 'bg-cotton text-ink/60 hover:bg-dal'
                          }`}
                        >
                          {slot}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <label className="mt-4 block">
                  <span className="track text-ink/35">Guest name</span>
                  <input
                    value={guest}
                    onChange={(e) => onGuest(e.target.value)}
                    placeholder="Name on the pass"
                    maxLength={40}
                    className="mt-2 w-full border border-iron/25 bg-cotton px-3 py-2.5 font-mono text-[11px] text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-ochre"
                  />
                </label>

                <button
                  type="button"
                  onClick={onGenerate}
                  disabled={!canGenerate}
                  className="mt-4 w-full bg-terracotta px-4 py-3 text-cotton transition-colors hover:bg-iron disabled:cursor-not-allowed disabled:bg-ink/25"
                >
                  <span className="track">Generate kitchen token</span>
                </button>
                {!canGenerate && (
                  <p className="mt-2 font-mono text-[9.5px] leading-relaxed text-ink/40">
                    {tray.length === 0
                      ? 'Add at least one tiffin to issue a token.'
                      : 'Add a guest name to issue a token.'}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {token && (
          <div className="hair-t bg-cotton px-4 py-3 sm:px-5">
            <button
              type="button"
              onClick={onResetToken}
              className="w-full border border-iron/25 px-4 py-2.5 transition-colors hover:border-iron hover:bg-dal"
            >
              <span className="track text-ink/70">Back to tray</span>
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}
