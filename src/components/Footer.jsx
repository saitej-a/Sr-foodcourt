import { BRANCHES } from '../data/branches'

export default function Footer({ onBranch }) {
  return (
    <footer className="bg-iron text-cotton">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-8 pt-12">
          <div>
            <div className="track text-brass">S R ఫుడ్ కోర్ట్ · Telangana</div>
            <div className="mt-3 font-display text-[3rem] font-light leading-[0.9] tracking-tightest sm:text-[5rem]">
              Seven tiffins.
              <br />
              <em className="italic text-brass">Every</em> dawn.
            </div>
          </div>
          <div className="font-mono text-[10px] leading-relaxed text-cotton/40">
            HEADQUARTERS
            <br />
            <span className="text-cotton/70">SH 7, Velgatoor, Telangana 505416</span>
            <br />
            18.7545098° N, 79.1916691° E
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px bg-cotton/15 sm:grid-cols-2 lg:grid-cols-4">
          {BRANCHES.map((branch) => (
            <button
              key={branch.id}
              type="button"
              onClick={() => onBranch(branch.id)}
              className="bg-iron px-1 py-5 text-left transition-colors hover:bg-[#1c1916]"
            >
              <div className="track text-brass/70">{branch.short}</div>
              <div className="mt-2 font-display text-[17px] leading-tight">{branch.name}</div>
              <div className="mt-1 font-telugu text-[11px] text-cotton/40">{branch.telugu}</div>
              <div className="mt-3 font-mono text-[10px] leading-relaxed text-cotton/55">
                {branch.hours.replace('Monday – Sunday · ', '')}
                <br />
                {branch.phone}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-cotton/15 py-5">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-cotton/35">
              Prices ₹1–200 per person
            </span>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-cotton/35">
              Breakfast · Dine-in · Takeout
            </span>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-cotton/35">
              Pure cow ghee
            </span>
          </div>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-cotton/25">
            © 2026 S R Food Court
          </span>
        </div>
      </div>
    </footer>
  )
}
