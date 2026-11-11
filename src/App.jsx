import { useMemo, useState } from 'react'
import { BRANCHES } from './data/branches'
import { ARRIVAL_WINDOWS, DISHES, ROAST_OPTIONS, SAMBAR_OPTIONS, SERVICES } from './data/dishes'
import Grain from './components/Grain'
import IntroFilm from './components/IntroFilm'
import Header from './components/Header'
import Hero from './components/Hero'
import DishIndex from './components/DishIndex'
import PairingLab from './components/PairingLab'
import BranchExplorer from './components/BranchExplorer'
import TrayDrawer from './components/TrayDrawer'
import Footer from './components/Footer'

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const [branchId, setBranchId] = useState('velgatoor')
  const [dishId, setDishId] = useState('dosa')
  const [roast, setRoast] = useState(ROAST_OPTIONS[0])
  const [sambar, setSambar] = useState(SAMBAR_OPTIONS[0])
  const [tray, setTray] = useState([])
  const [chutneys, setChutneys] = useState([])
  const [trayOpen, setTrayOpen] = useState(false)
  const [service, setService] = useState(SERVICES[0])
  const [arrival, setArrival] = useState(ARRIVAL_WINDOWS[1])
  const [guest, setGuest] = useState('')
  const [token, setToken] = useState(null)
  const [tokenSeq, setTokenSeq] = useState(118)
  const [preset, setPreset] = useState('threeQuarter')
  const [autoOrbit, setAutoOrbit] = useState(false)
  const [steamHigh, setSteamHigh] = useState(true)

  const branch = BRANCHES.find((b) => b.id === branchId) ?? BRANCHES[0]
  const dish = DISHES.find((d) => d.id === dishId) ?? DISHES[0]
  const trayCount = useMemo(() => tray.reduce((n, item) => n + item.qty, 0), [tray])

  const addItem = (key, changes = {}) => {
    setTray((prev) => {
      const found = prev.find((item) => item.key === key)
      if (found) {
        return prev.map((item) => (item.key === key ? { ...item, ...changes } : item))
      }
      return [...prev, { key, dishId, roast, sambar, qty: 1, ...changes }]
    })
  }

  const handleAdd = () => {
    addItem(`${dishId}|${roast}|${sambar}`)
    setToken(null)
    setTrayOpen(true)
  }

  const handleInc = (key) =>
    setTray((prev) => prev.map((item) => (item.key === key ? { ...item, qty: item.qty + 1 } : item)))

  const handleDec = (key) =>
    setTray((prev) =>
      prev
        .map((item) => (item.key === key ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0),
    )

  const handleClear = () => {
    setTray([])
    setToken(null)
  }

  const toggleChutney = (id) =>
    setChutneys((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]))

  const handleGenerate = () => {
    if (!tray.length || !guest.trim()) return
    const items = tray.map((item) => ({
      ...item,
      dish: DISHES.find((d) => d.id === item.dishId) ?? DISHES[0],
    }))
    setToken({
      id: `${branch.tokenPrefix}-${tokenSeq}`,
      branch,
      service,
      arrival,
      guest: guest.trim(),
      items,
      chutneys,
      count: trayCount,
      issued: new Date(),
    })
    setTokenSeq((n) => n + 1)
  }

  return (
    <div className="min-h-screen bg-cotton text-iron">
      {introDone ? null : <IntroFilm onEnter={() => setIntroDone(true)} />}
      <Grain />
      <Header
        branchId={branchId}
        onBranch={(id) => {
          setBranchId(id)
        }}
        trayCount={trayCount}
        onOpenTray={() => setTrayOpen(true)}
      />

      <main>
        <Hero
          branch={branch}
          dish={dish}
          roast={roast}
          sambar={sambar}
          onDish={setDishId}
          onRoast={setRoast}
          onSambar={setSambar}
          onAdd={handleAdd}
          preset={preset}
          onPreset={setPreset}
          autoOrbit={autoOrbit}
          onAutoOrbit={() => setAutoOrbit((v) => !v)}
          steamHigh={steamHigh}
          onSteam={() => setSteamHigh((v) => !v)}
        />

        <DishIndex activeDish={dishId} onSelect={setDishId} />

        <PairingLab
          dish={dish}
          selected={chutneys}
          onToggle={toggleChutney}
          onClear={() => setChutneys([])}
        />

        <BranchExplorer branchId={branchId} onChange={setBranchId} />
      </main>

      <Footer onBranch={setBranchId} />

      <TrayDrawer
        open={trayOpen}
        onClose={() => setTrayOpen(false)}
        tray={tray}
        onInc={handleInc}
        onDec={handleDec}
        onClear={handleClear}
        chutneys={chutneys}
        onToggleChutney={toggleChutney}
        branch={branch}
        service={service}
        onService={setService}
        arrival={arrival}
        onArrival={setArrival}
        guest={guest}
        onGuest={setGuest}
        onGenerate={handleGenerate}
        token={token}
        onResetToken={() => setToken(null)}
      />
    </div>
  )
}
