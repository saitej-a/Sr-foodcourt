import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { DISHES } from '../data/dishes'

const DISH_ANGLE = (Math.PI * 2) / 7
const RADIUS = 2.02

export const CAMERA_PRESETS = {
  threeQuarter: { label: '3/4 Brass Thali', pos: [0, 4.7, 8.7], look: [0, 0.38, 0] },
  overhead: { label: 'Overhead Banana Leaf', pos: [0.3, 11.2, 2.6], look: [0, 0.2, 0] },
  low: { label: 'Low Griddle Angle', pos: [0, 1.15, 9.2], look: [0, 1.05, 0] },
  close: { label: 'Dish Close-Up', pos: [0, 2.5, 5.3], look: [0, 0.75, 0] },
}

const std = (color, extra) =>
  new THREE.MeshStandardMaterial({ color, roughness: 0.62, metalness: 0.04, ...extra })

function buildDosa() {
  const g = new THREE.Group()
  const mat = std(0xd88b28, { roughness: 0.34, metalness: 0.08 })
  const roll = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.27, 0.82, 32), mat)
  roll.rotation.z = 1.42
  roll.rotation.y = 0.28
  roll.position.y = 0.25
  g.add(roll)
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.34, 24), std(0xc97a1e, { roughness: 0.38 }))
  tip.rotation.z = 1.42
  tip.position.set(-0.5, 0.26, 0.07)
  g.add(tip)
  return g
}

function buildIdli() {
  const g = new THREE.Group()
  const white = std(0xf7f3eb, { roughness: 0.88, metalness: 0 })
  const spice = std(0xa83820, { roughness: 0.75 })
  const sphere = new THREE.SphereGeometry(1, 28, 20)
  const cap = new THREE.CylinderGeometry(0.085, 0.11, 0.03, 24)
  const spots = [
    [-0.23, 0.13],
    [0.22, 0.1],
    [0, -0.22],
  ]
  spots.forEach(([x, z], i) => {
    const cake = new THREE.Mesh(sphere, white)
    cake.scale.set(0.27, 0.18, 0.27)
    cake.position.set(x, 0.18, z)
    g.add(cake)
    const lid = new THREE.Mesh(cap, spice)
    lid.position.set(x, 0.355, z)
    lid.rotation.z = i * 0.4
    g.add(lid)
  })
  return g
}

function buildVada() {
  const g = new THREE.Group()
  const mat = std(0xc46d1b, { roughness: 0.52, metalness: 0.05 })
  const geo = new THREE.TorusGeometry(0.2, 0.085, 14, 32)
  const a = new THREE.Mesh(geo, mat)
  a.rotation.x = -Math.PI / 2
  a.position.set(-0.14, 0.09, 0.09)
  const b = new THREE.Mesh(geo, mat)
  b.rotation.x = -Math.PI / 2
  b.rotation.z = 0.4
  b.position.set(0.17, 0.1, -0.1)
  g.add(a, b)
  return g
}

function buildPuri() {
  const g = new THREE.Group()
  const mat = std(0xe09f3e, { roughness: 0.58, metalness: 0.04 })
  const sphere = new THREE.SphereGeometry(1, 28, 20)
  const spots = [
    [-0.16, 0.06],
    [0.16, -0.05],
  ]
  spots.forEach(([x, z]) => {
    const puff = new THREE.Mesh(sphere, mat)
    puff.scale.set(0.27, 0.22, 0.27)
    puff.position.set(x, 0.22, z)
    g.add(puff)
  })
  return g
}

function buildBonda() {
  const g = new THREE.Group()
  const mat = std(0xb85d19, { roughness: 0.55, metalness: 0.05 })
  const sphere = new THREE.SphereGeometry(0.2, 26, 18)
  const spots = [
    [-0.19, 0.1, 0.21],
    [0.18, 0.07, 0.21],
    [0.01, -0.17, 0.2],
  ]
  spots.forEach(([x, z, y]) => {
    const ball = new THREE.Mesh(sphere, mat)
    ball.position.set(x, y, z)
    g.add(ball)
  })
  return g
}

function buildUthappa() {
  const g = new THREE.Group()
  const disc = new THREE.Mesh(
    new THREE.CylinderGeometry(0.44, 0.42, 0.1, 48),
    std(0xc97a2b, { roughness: 0.64, metalness: 0.04 }),
  )
  disc.position.y = 0.06
  g.add(disc)
  const onion = std(0x8e2f3c, { roughness: 0.7 })
  const chilli = std(0x4d7a34, { roughness: 0.7 })
  const cube = new THREE.BoxGeometry(0.07, 0.045, 0.07)
  const garnishes = [
    [0.16, 0.1, 'o'],
    [-0.19, 0.13, 'c'],
    [0.05, -0.2, 'o'],
    [-0.1, -0.12, 'c'],
    [0.24, -0.09, 'o'],
    [-0.02, 0.24, 'c'],
  ]
  garnishes.forEach(([x, z, kind]) => {
    const m = new THREE.Mesh(cube, kind === 'o' ? onion : chilli)
    m.position.set(x, 0.115, z)
    m.rotation.y = Math.random() * Math.PI
    g.add(m)
  })
  return g
}

function buildUpma() {
  const g = new THREE.Group()
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 32, 20, 0, Math.PI * 2, 0, Math.PI / 2),
    std(0xe8c585, { roughness: 0.82, metalness: 0.02 }),
  )
  dome.position.y = 0.005
  g.add(dome)
  const cashewMat = std(0xf2dfb6, { roughness: 0.5 })
  const arc = new THREE.TorusGeometry(0.1, 0.026, 8, 18, Math.PI)
  const spots = [
    [0.08, 0.33, 0.04, 0.4],
    [-0.14, 0.27, 0.1, -0.7],
    [0.02, 0.3, -0.16, 1.9],
  ]
  spots.forEach(([x, y, z, r]) => {
    const nut = new THREE.Mesh(arc, cashewMat)
    nut.position.set(x, y, z)
    nut.rotation.set(Math.PI / 2.4, 0, r)
    g.add(nut)
  })
  return g
}

const BUILDERS = {
  dosa: buildDosa,
  idli: buildIdli,
  vada: buildVada,
  puri: buildPuri,
  bonda: buildBonda,
  uthappa: buildUthappa,
  upma: buildUpma,
}

function steamTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  grad.addColorStop(0, 'rgba(255,255,255,0.95)')
  grad.addColorStop(0.45, 'rgba(255,255,255,0.32)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 64, 64)
  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}

function softShadowTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  const grad = ctx.createRadialGradient(64, 64, 4, 64, 64, 64)
  grad.addColorStop(0, 'rgba(0,0,0,0.85)')
  grad.addColorStop(0.55, 'rgba(0,0,0,0.35)')
  grad.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(canvas)
}

export default function ThaliStage({
  activeDish,
  warm = 0xffd9a8,
  warmIntensity = 2.4,
  preset = 'threeQuarter',
  autoOrbit = false,
  steamHigh = true,
}) {
  const mountRef = useRef(null)
  const ctrl = useRef({})
  const [failed, setFailed] = useState(false)
  const activeIndex = Math.max(0, DISHES.findIndex((d) => d.id === activeDish))

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch (err) {
      setFailed(true)
      return undefined
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(...CAMERA_PRESETS.threeQuarter.pos)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.inset = '0'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    mount.appendChild(renderer.domElement)

    const hemi = new THREE.HemisphereLight(0xffe9c9, 0x2a1b10, 0.72)
    const key = new THREE.DirectionalLight(warm, warmIntensity)
    key.position.set(5.5, 8.5, 6)
    const fill = new THREE.PointLight(0xff9b45, 42, 30, 2)
    fill.position.set(-6.5, 3.4, -4.2)
    const rim = new THREE.DirectionalLight(0xfff3dd, 1.15)
    rim.position.set(-1.5, 5, -8)
    scene.add(hemi, key, fill, rim)

    const platter = new THREE.Group()
    scene.add(platter)

    const brass = new THREE.MeshStandardMaterial({ color: 0xd4a843, metalness: 0.95, roughness: 0.26 })
    const brassDeep = new THREE.MeshStandardMaterial({ color: 0xa87d2a, metalness: 0.9, roughness: 0.42 })
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x24442e, roughness: 0.72, metalness: 0.03 })

    const base = new THREE.Mesh(new THREE.CylinderGeometry(3.18, 2.9, 0.18, 128, 1), brassDeep)
    base.position.y = -0.05
    const plate = new THREE.Mesh(new THREE.CylinderGeometry(3.06, 3.06, 0.06, 128), brass)
    plate.position.y = 0.05
    const rimRing = new THREE.Mesh(new THREE.TorusGeometry(3.06, 0.085, 20, 180), brass)
    rimRing.rotation.x = -Math.PI / 2
    rimRing.position.y = 0.075
    const leaf = new THREE.Mesh(new THREE.CircleGeometry(2.82, 128), leafMat)
    leaf.rotation.x = -Math.PI / 2
    leaf.position.y = 0.09
    leaf.scale.x = 0.96
    const engraving = new THREE.Mesh(new THREE.TorusGeometry(2.36, 0.008, 6, 140), brassDeep)
    engraving.rotation.x = -Math.PI / 2
    engraving.position.y = 0.096
    platter.add(base, plate, rimRing, leaf, engraving)

    const katoriDefs = [
      { angle: 0, color: 0xf4ead6 },
      { angle: (Math.PI * 2) / 3, color: 0xb9762a },
      { angle: (Math.PI * 4) / 3, color: 0x8f3220 },
    ]
    katoriDefs.forEach(({ angle, color }) => {
      const bowl = new THREE.Group()
      const shell = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.25, 0.22, 44), brass)
      shell.position.y = 0.11
      const content = new THREE.Mesh(
        new THREE.CylinderGeometry(0.34, 0.32, 0.035, 44),
        std(color, { roughness: 0.55, metalness: 0.02 }),
      )
      content.position.y = 0.205
      const lip = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.016, 8, 48), brassDeep)
      lip.rotation.x = -Math.PI / 2
      lip.position.y = 0.22
      bowl.add(shell, content, lip)
      bowl.position.set(Math.sin(angle) * 0.95, 0.09, Math.cos(angle) * 0.95)
      platter.add(bowl)
    })

    const davara = new THREE.Group()
    const saucer = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.24, 0.09, 44), brass)
    saucer.position.y = 0.045
    const coffee = new THREE.Mesh(
      new THREE.CylinderGeometry(0.265, 0.245, 0.02, 44),
      std(0x3a2418, { roughness: 0.4, metalness: 0.1 }),
    )
    coffee.position.y = 0.088
    const tumbler = new THREE.Mesh(new THREE.CylinderGeometry(0.155, 0.13, 0.4, 44), brass)
    tumbler.position.y = 0.3
    const tumblerTop = new THREE.Mesh(
      new THREE.CircleGeometry(0.14, 40),
      std(0x4a2c1c, { roughness: 0.35, metalness: 0.1 }),
    )
    tumblerTop.rotation.x = -Math.PI / 2
    tumblerTop.position.y = 0.5
    davara.add(saucer, coffee, tumbler, tumblerTop)
    davara.position.y = 0.09
    platter.add(davara)

    const dishPositions = []
    DISHES.forEach((dish, i) => {
      const angle = i * DISH_ANGLE
      const builder = BUILDERS[dish.id] ?? buildIdli
      const group = builder()
      group.position.set(Math.sin(angle) * RADIUS, 0.09, Math.cos(angle) * RADIUS)
      group.rotation.y = angle
      platter.add(group)
      dishPositions.push(new THREE.Vector3(Math.sin(angle) * RADIUS, 0.16, Math.cos(angle) * RADIUS))
    })

    const highlight = new THREE.Mesh(
      new THREE.TorusGeometry(0.56, 0.02, 10, 72),
      new THREE.MeshStandardMaterial({
        color: 0xffe3a0,
        emissive: 0xd4a843,
        emissiveIntensity: 1.1,
        metalness: 0.9,
        roughness: 0.3,
        transparent: true,
        opacity: 0.7,
      }),
    )
    highlight.rotation.x = -Math.PI / 2
    highlight.position.copy(dishPositions[activeIndex])
    platter.add(highlight)

    const steamCount = 420
    const steamPositions = new Float32Array(steamCount * 3)
    const steamData = []
    for (let i = 0; i < steamCount; i += 1) {
      const di = i % 7
      const angle = di * DISH_ANGLE + (Math.random() - 0.5) * 0.22
      const r = RADIUS + (Math.random() - 0.5) * 0.24
      const p = {
        x: Math.sin(angle) * r,
        z: Math.cos(angle) * r,
        y: Math.random() * 0.8 + 0.32,
        speed: 0.18 + Math.random() * 0.16,
        phase: Math.random() * Math.PI * 2,
      }
      steamData.push(p)
      steamPositions[i * 3] = p.x
      steamPositions[i * 3 + 1] = p.y
      steamPositions[i * 3 + 2] = p.z
    }
    const steamGeo = new THREE.BufferGeometry()
    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3))
    const steamMat = new THREE.PointsMaterial({
      size: 0.22,
      map: steamTexture(),
      color: 0xfff2e0,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    const steam = new THREE.Points(steamGeo, steamMat)
    platter.add(steam)

    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(9.5, 9.5),
      new THREE.MeshBasicMaterial({
        map: softShadowTexture(),
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
      }),
    )
    shadow.rotation.x = -Math.PI / 2
    shadow.position.y = -0.16
    scene.add(shadow)

    const camPos = camera.position.clone()
    const camPosTarget = new THREE.Vector3(...CAMERA_PRESETS[preset].pos)
    const camLook = new THREE.Vector3(...CAMERA_PRESETS[preset].look)
    const camLookTarget = camLook.clone()

    const initialRot = -activeIndex * DISH_ANGLE
    ctrl.current = {
      platter,
      camera,
      renderer,
      steamGeo,
      steamMat,
      steamData,
      highlight,
      dishPositions,
      key,
      camPos,
      camPosTarget,
      camLook,
      camLookTarget,
      activeIndex,
      currentRot: initialRot,
      targetRot: initialRot,
      auto: autoOrbit,
      steamHigh,
    }

    const resize = () => {
      const w = mount.clientWidth || 1
      const h = mount.clientHeight || 1
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      // Keep the whole thali in frame when the stage is tall or narrow.
      const referenceDistance = 9.9
      const halfHeight = referenceDistance * Math.tan((camera.fov * Math.PI) / 360)
      camera.zoom = Math.min(1, Math.max(0.52, (halfHeight * camera.aspect) / 3.5))
      camera.updateProjectionMatrix()
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(mount)

    const clock = new THREE.Clock()
    let raf = 0

    const tick = () => {
      const c = ctrl.current
      if (!c.platter) return
      const dt = Math.min(clock.getDelta(), 0.05)
      const t = clock.elapsedTime

      if (c.auto) c.targetRot += dt * 0.24
      c.currentRot += (c.targetRot - c.currentRot) * Math.min(1, dt * 3.4)
      c.platter.rotation.y = c.currentRot

      const target = c.dishPositions[c.activeIndex] ?? c.dishPositions[0]
      c.highlight.position.lerp(target, Math.min(1, dt * 6))
      c.highlight.scale.setScalar(1 + Math.sin(t * 3) * 0.055)
      c.highlight.material.opacity = 0.5 + Math.sin(t * 3) * 0.24

      const arr = c.steamGeo.attributes.position.array
      const high = c.steamHigh
      for (let i = 0; i < c.steamData.length; i += 1) {
        const p = c.steamData[i]
        p.y += p.speed * dt * (high ? 1 : 0.55)
        if (p.y > 1.16) p.y = 0.32
        arr[i * 3] = p.x + Math.sin(p.y * 2.1 + p.phase) * 0.06
        arr[i * 3 + 1] = p.y
        arr[i * 3 + 2] = p.z + Math.cos(p.y * 1.7 + p.phase) * 0.06
      }
      c.steamGeo.attributes.position.needsUpdate = true
      c.steamMat.opacity = high ? 0.22 : 0.09
      c.steamMat.size = high ? 0.22 : 0.15

      c.camPos.lerp(c.camPosTarget, Math.min(1, dt * 4))
      c.camLook.lerp(c.camLookTarget, Math.min(1, dt * 4))
      c.camera.position.copy(c.camPos)
      c.camera.lookAt(c.camLook)

      c.renderer.render(scene, c.camera)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      ctrl.current = {}
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
          mats.forEach((m) => {
            if (m.map) m.map.dispose()
            m.dispose()
          })
        }
      })
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const c = ctrl.current
    if (!c.platter) return
    c.activeIndex = activeIndex
    const angle = -activeIndex * DISH_ANGLE
    let target = angle
    while (target - c.targetRot > Math.PI) target -= Math.PI * 2
    while (c.targetRot - target > Math.PI) target += Math.PI * 2
    c.targetRot = target
  }, [activeIndex])

  useEffect(() => {
    const c = ctrl.current
    if (!c.camera) return
    const p = CAMERA_PRESETS[preset] ?? CAMERA_PRESETS.threeQuarter
    c.camPosTarget.set(...p.pos)
    c.camLookTarget.set(...p.look)
  }, [preset])

  useEffect(() => {
    const c = ctrl.current
    if (!c.platter) return
    c.auto = autoOrbit
    c.steamHigh = steamHigh
  }, [autoOrbit, steamHigh])

  useEffect(() => {
    const c = ctrl.current
    if (!c.key) return
    c.key.color.setHex(warm)
    c.key.intensity = warmIntensity
  }, [warm, warmIntensity])

  if (failed) {
    return (
      <div className="absolute inset-0 grid place-items-center p-6 text-center">
        <p className="font-mono text-[11px] leading-relaxed text-cotton/50">
          WebGL unavailable in this browser — the seven tiffins are listed below.
        </p>
      </div>
    )
  }

  return (
    <div
      ref={mountRef}
      className="absolute inset-0"
      role="img"
      aria-label="Interactive 3D brass thali lined with a banana leaf, holding seven South Indian tiffins, three brass chutney katori and a davara-tumbler filter coffee set."
    />
  )
}
