import * as THREE from 'three'

/**
 * Creates a stylized, luxury 3D Birthday Cake with golden "MANISHA" plaque,
 * candles with warm animated flames, and extinguish controls.
 */
export function createCakeMesh() {
  const cakeGroup = new THREE.Group()
  cakeGroup.name = 'birthday_cake_group'

  // Colors
  const goldColor = 0xe6c887
  const creamColor = 0xf5eedc
  const cakeFrostingColor = 0x1a162b // deep luxury velvet plum/obsidian

  // 1. Stand / Pediment Base
  const standGeom = new THREE.CylinderGeometry(1.6, 1.8, 0.15, 48)
  const standPillarGeom = new THREE.CylinderGeometry(0.8, 1.1, 0.4, 32)
  const standMat = new THREE.MeshStandardMaterial({
    color: goldColor,
    metalness: 0.85,
    roughness: 0.25,
  })
  const standBase = new THREE.Mesh(standGeom, standMat)
  standBase.position.y = -0.5
  standBase.castShadow = true
  standBase.receiveShadow = true
  cakeGroup.add(standBase)

  const standPillar = new THREE.Mesh(standPillarGeom, standMat)
  standPillar.position.y = -0.25
  cakeGroup.add(standPillar)

  // 2. Bottom Tier
  const tier1Geom = new THREE.CylinderGeometry(1.4, 1.45, 0.7, 48)
  const tier1Mat = new THREE.MeshStandardMaterial({
    color: cakeFrostingColor,
    roughness: 0.5,
    metalness: 0.1,
  })
  const tier1 = new THREE.Mesh(tier1Geom, tier1Mat)
  tier1.position.y = 0.35
  tier1.castShadow = true
  tier1.receiveShadow = true
  cakeGroup.add(tier1)

  // Bottom gold trim ring
  const trim1Geom = new THREE.TorusGeometry(1.44, 0.04, 16, 64)
  const trimMat = new THREE.MeshStandardMaterial({
    color: goldColor,
    metalness: 0.9,
    roughness: 0.2,
  })
  const trim1 = new THREE.Mesh(trim1Geom, trimMat)
  trim1.rotation.x = Math.PI / 2
  trim1.position.y = 0.05
  cakeGroup.add(trim1)

  // 3. Top Tier
  const tier2Geom = new THREE.CylinderGeometry(1.0, 1.05, 0.6, 48)
  const tier2Mat = new THREE.MeshStandardMaterial({
    color: 0x241e3d,
    roughness: 0.45,
    metalness: 0.15,
  })
  const tier2 = new THREE.Mesh(tier2Geom, tier2Mat)
  tier2.position.y = 0.95
  tier2.castShadow = true
  tier2.receiveShadow = true
  cakeGroup.add(tier2)

  // Cream drip / pearl beads around top tier
  const pearlCount = 28
  const pearlGeom = new THREE.SphereGeometry(0.04, 12, 12)
  const pearlMat = new THREE.MeshStandardMaterial({
    color: creamColor,
    roughness: 0.3,
    metalness: 0.2,
  })
  for (let i = 0; i < pearlCount; i++) {
    const angle = (i / pearlCount) * Math.PI * 2
    const px = Math.cos(angle) * 1.03
    const pz = Math.sin(angle) * 1.03
    const pearl = new THREE.Mesh(pearlGeom, pearlMat)
    pearl.position.set(px, 1.25, pz)
    cakeGroup.add(pearl)
  }

  // 4. Golden Plaque: "MANISHA"
  const plaqueCanvas = document.createElement('canvas')
  plaqueCanvas.width = 512
  plaqueCanvas.height = 160
  const ctx = plaqueCanvas.getContext('2d')
  if (ctx) {
    // Elegant plaque background with gold border
    ctx.fillStyle = '#0d0b17'
    ctx.fillRect(0, 0, 512, 160)
    ctx.strokeStyle = '#e6c887'
    ctx.lineWidth = 6
    ctx.strokeRect(8, 8, 496, 144)
    ctx.strokeStyle = '#c49e54'
    ctx.lineWidth = 2
    ctx.strokeRect(16, 16, 480, 128)

    // Gold gradient text
    const grad = ctx.createLinearGradient(0, 30, 0, 130)
    grad.addColorStop(0, '#ffffff')
    grad.addColorStop(0.3, '#fbf0d3')
    grad.addColorStop(0.7, '#e6c887')
    grad.addColorStop(1, '#b88c3a')

    ctx.fillStyle = grad
    ctx.font = 'bold 54px Georgia, "Cinzel", serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('MANISHA', 256, 80)
  }

  const plaqueTex = new THREE.CanvasTexture(plaqueCanvas)
  plaqueTex.colorSpace = THREE.SRGBColorSpace
  const plaqueGeom = new THREE.PlaneGeometry(1.1, 0.35)
  const plaqueMat = new THREE.MeshStandardMaterial({
    map: plaqueTex,
    roughness: 0.2,
    metalness: 0.8,
    side: THREE.FrontSide,
  })
  const plaqueMesh = new THREE.Mesh(plaqueGeom, plaqueMat)
  plaqueMesh.position.set(0, 0.45, 1.46)
  plaqueMesh.rotation.y = 0
  cakeGroup.add(plaqueMesh)

  // 5. Birthday Candles & Flames
  const candleCount = 3
  const candles = []
  const candleFlameMeshes = []
  const candleLights = []

  const candlePositions = [
    { x: -0.4, z: 0 },
    { x: 0, z: 0.15 },
    { x: 0.4, z: 0 },
  ]

  candlePositions.forEach((pos, idx) => {
    // Candle body
    const candleGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.45, 16)
    const candleMat = new THREE.MeshStandardMaterial({
      color: 0xfdfbf7,
      roughness: 0.4,
    })
    const candleMesh = new THREE.Mesh(candleGeom, candleMat)
    candleMesh.position.set(pos.x, 1.45, pos.z)
    cakeGroup.add(candleMesh)

    // Wick
    const wickGeom = new THREE.CylinderGeometry(0.008, 0.008, 0.08, 8)
    const wickMat = new THREE.MeshBasicMaterial({ color: 0x111111 })
    const wick = new THREE.Mesh(wickGeom, wickMat)
    wick.position.set(pos.x, 1.7, pos.z)
    cakeGroup.add(wick)

    // Flame Core (tear-drop shape)
    const flameGeom = new THREE.ConeGeometry(0.04, 0.12, 16)
    flameGeom.translate(0, 0.06, 0)
    const flameMat = new THREE.MeshBasicMaterial({
      color: 0xffe680,
    })
    const flameMesh = new THREE.Mesh(flameGeom, flameMat)
    flameMesh.position.set(pos.x, 1.74, pos.z)
    cakeGroup.add(flameMesh)

    // Flame outer glow
    const glowGeom = new THREE.SphereGeometry(0.09, 16, 16)
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xff8811,
      transparent: true,
      opacity: 0.65,
    })
    const glowMesh = new THREE.Mesh(glowGeom, glowMat)
    glowMesh.position.set(pos.x, 1.77, pos.z)
    cakeGroup.add(glowMesh)

    // Candle PointLight for warm illumination on cake & surroundings
    const candleLight = new THREE.PointLight(0xffa737, 1.8, 4.5, 1.5)
    candleLight.position.set(pos.x, 1.85, pos.z)
    cakeGroup.add(candleLight)

    candleFlameMeshes.push({
      flame: flameMesh,
      glow: glowMesh,
      light: candleLight,
      basePosY: 1.74,
      seed: idx * 1.5,
    })
  })

  // Store references for animation & extinguish effect
  cakeGroup.userData = {
    isCake: true,
    candleFlames: candleFlameMeshes,
    areCandlesLit: true,
    extinguish() {
      cakeGroup.userData.areCandlesLit = false
    },
    relight() {
      cakeGroup.userData.areCandlesLit = true
    },
  }

  return cakeGroup
}
