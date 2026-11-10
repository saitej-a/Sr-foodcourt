const NOISE = encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/></filter><rect width='180' height='180' filter='url(#n)'/></svg>",
)

export default function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] mix-blend-multiply"
      style={{
        opacity: 0.035,
        backgroundImage: `url("data:image/svg+xml,${NOISE}")`,
        backgroundSize: '180px 180px',
      }}
    />
  )
}
