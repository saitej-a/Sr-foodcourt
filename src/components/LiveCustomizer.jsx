import { ROAST_OPTIONS, SAMBAR_OPTIONS } from '../data/dishes'

function OptionRow({ label, options, value, onChange }) {
  return (
    <div>
      <div className="track text-ink/40">{label}</div>
      <div className="mt-2 flex flex-wrap gap-px bg-iron/15">
        {options.map((option) => {
          const on = option === value
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={on}
              className={`flex-1 px-2.5 py-2 text-left font-sans text-[11px] leading-snug transition-colors ${
                on ? 'bg-iron text-cotton' : 'bg-cotton text-ink/70 hover:bg-dal'
              }`}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function LiveCustomizer({ dish, roast, sambar, onRoast, onSambar, onAdd }) {
  return (
    <div className="hair-t mt-8 pt-6">
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
          <span className="track text-terracotta">Live customizer</span>
        </div>
        <span className="font-mono text-[10px] text-ink/40">BATCH · {dish.num} / 07</span>
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-xl leading-tight tracking-tightest">{dish.name}</h3>
        <span className="shrink-0 font-mono text-[10px] text-ochre">{dish.category}</span>
      </div>
      <p className="mt-1 font-telugu text-[11px] text-ink/50">{dish.telugu}</p>

      <div className="mt-5 space-y-4">
        <OptionRow label="Tawa / Ghee finish" options={ROAST_OPTIONS} value={roast} onChange={onRoast} />
        <OptionRow
          label="Sambar & chutney serving"
          options={SAMBAR_OPTIONS}
          value={sambar}
          onChange={onSambar}
        />
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="group mt-5 flex w-full items-center justify-between gap-4 border border-iron bg-iron px-4 py-3 text-left text-cotton transition-colors hover:border-terracotta hover:bg-terracotta"
      >
        <span>
          <span className="track block text-cotton/55 group-hover:text-cotton/75">Add to morning tray</span>
          <span className="mt-1 block text-[13px] text-cotton/90">{dish.name}</span>
        </span>
        <span className="font-display text-2xl leading-none text-brass">＋</span>
      </button>
    </div>
  )
}
