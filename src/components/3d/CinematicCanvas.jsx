import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { photos } from '../../data/photos'
import { createPhotoCardMesh } from './PhotoCardMesh'
import { createCakeMesh } from './CakeMesh'

export default function CinematicCanvas({
  currentScene = 1,
  selectedPhotoId = null,
  onSelectPhoto = () => {},
  candlesBlown = false,
  onCandleBlow = () => {},
  onLoaded = () => {},
  onWebGLUnsupported = () => {},
}) {
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const clockRef = useRef(new THREE.Clock())
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const cakeMeshRef = useRef(null)
  const photoMeshesRef = useRef([])
  const timelineGroupRef = useRef(null)
  const distanceGroupRef = useRef(null)
  const particlesRef = useRef(null)
  const celebratoryParticlesRef = useRef(null)
  const texturesRef = useRef([])
  const galleryRotationRef = useRef(0)
  const isDraggingGalleryRef = useRef(false)
  const lastPointerXRef = useRef(0)
  const warpIntensityRef = useRef(0)

  // Camera targets for each scene (8 scenes total)
  const cameraTargets = {
    1: { pos: new THREE.Vector3(0, 0, 9.5), look: new THREE.Vector3(0, 0, 0) },
    2: { pos: new THREE.Vector3(0, 0.2, 7.8), look: new THREE.Vector3(0, 0, 0) },
    3: { pos: new THREE.Vector3(0, 0.4, 8.2), look: new THREE.Vector3(0, 0.2, 0) },
    4: { pos: new THREE.Vector3(0, 0.5, 9.0), look: new THREE.Vector3(0, 0, 0) },
    5: { pos: new THREE.Vector3(0, 0.1, 7.4), look: new THREE.Vector3(0, 0, 0) },
    6: { pos: new THREE.Vector3(0, 0, 7.0), look: new THREE.Vector3(0, 0, 0) },
    7: { pos: new THREE.Vector3(0, 1.2, 5.2), look: new THREE.Vector3(0, 0.8, 0) },
    8: { pos: new THREE.Vector3(0, 0.5, 8.8), look: new THREE.Vector3(0, 0.2, 0) },
  }

  const currentCamPos = useRef(new THREE.Vector3(0, 0, 12))
  const currentCamLook = useRef(new THREE.Vector3(0, 0, 0))

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // 1. Check WebGL availability
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
    } catch (e) {
      console.warn('WebGL initialization failed:', e)
      onWebGLUnsupported()
      return
    }

    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight

    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // 2. Scene & Camera Setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x050508, 0.035)
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 12)
    cameraRef.current = camera

    // 3. Lighting System
    const ambientLight = new THREE.AmbientLight(0x28233a, 1.4)
    scene.add(ambientLight)

    const moonLight = new THREE.DirectionalLight(0xd4e2ff, 1.6)
    moonLight.position.set(5, 10, 7)
    moonLight.castShadow = true
    moonLight.shadow.mapSize.width = 1024
    moonLight.shadow.mapSize.height = 1024
    scene.add(moonLight)

    const warmAccentLight = new THREE.PointLight(0xe6c887, 2.5, 20)
    warmAccentLight.position.set(-4, -2, 5)
    scene.add(warmAccentLight)

    const roseAccentLight = new THREE.PointLight(0xd68fa8, 2.0, 20)
    roseAccentLight.position.set(4, -3, 4)
    scene.add(roseAccentLight)

    // 4. Background Star & Dust Particle Universe
    const particleCount = window.innerWidth < 768 ? 1000 : 2400
    const particleGeom = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleScales = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 40
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 28
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 35 - 5
      particleScales[i] = Math.random() * 0.8 + 0.2
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particleGeom.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1))

    const particleMat = new THREE.PointsMaterial({
      color: 0xf5f3ff,
      size: 0.1,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(particleGeom, particleMat)
    scene.add(particles)
    particlesRef.current = particles

    // 5. Celebration Sparks System (For Cake Extinguish & Final Scene)
    const sparkCount = 700
    const sparkGeom = new THREE.BufferGeometry()
    const sparkPositions = new Float32Array(sparkCount * 3)
    const sparkVelocities = new Float32Array(sparkCount * 3)
    const sparkColors = new Float32Array(sparkCount * 3)

    const goldColor = new THREE.Color(0xe6c887)
    const roseColor = new THREE.Color(0xf6c0d0)

    for (let i = 0; i < sparkCount; i++) {
      sparkPositions[i * 3] = 0
      sparkPositions[i * 3 + 1] = -10
      sparkPositions[i * 3 + 2] = 0

      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 0.09 + 0.02
      sparkVelocities[i * 3] = Math.cos(angle) * speed
      sparkVelocities[i * 3 + 1] = Math.random() * 0.11 + 0.04
      sparkVelocities[i * 3 + 2] = Math.sin(angle) * speed

      const col = Math.random() > 0.4 ? goldColor : roseColor
      sparkColors[i * 3] = col.r
      sparkColors[i * 3 + 1] = col.g
      sparkColors[i * 3 + 2] = col.b
    }

    sparkGeom.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3))
    sparkGeom.setAttribute('color', new THREE.BufferAttribute(sparkColors, 3))

    const sparkMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const celebrationSparks = new THREE.Points(sparkGeom, sparkMat)
    celebrationSparks.userData = { velocities: sparkVelocities, active: false, time: 0 }
    scene.add(celebrationSparks)
    celebratoryParticlesRef.current = celebrationSparks

    // 6. Preload Manisha's 8 Photos as 3D Physical Cards
    const textureLoader = new THREE.TextureLoader()
    let loadedCount = 0
    const cardMeshes = []

    photos.forEach((photo) => {
      textureLoader.load(
        photo.url,
        (tex) => {
          texturesRef.current.push(tex)
          const card = createPhotoCardMesh(tex, photo, {
            width: window.innerWidth < 768 ? 1.7 : 2.1,
          })
          card.visible = true
          scene.add(card)
          cardMeshes.push(card)

          loadedCount++
          if (loadedCount === photos.length) {
            cardMeshes.sort((a, b) => a.userData.photo.id - b.userData.photo.id)
            photoMeshesRef.current = cardMeshes
            onLoaded()
          }
        },
        undefined,
        (err) => {
          console.warn('Failed to load photo texture:', photo.url, err)
          loadedCount++
          if (loadedCount === photos.length) {
            cardMeshes.sort((a, b) => a.userData.photo.id - b.userData.photo.id)
            photoMeshesRef.current = cardMeshes
            onLoaded()
          }
        }
      )
    })

    // 7. Scene 3 — Timeline Curve & Milestones (positioned lower so text is crystal clear)
    const timelineGroup = new THREE.Group()
    timelineGroup.name = 'timeline_group'

    const curvePoints = [
      new THREE.Vector3(-5.2, -1.4, -1),
      new THREE.Vector3(-2.6, -0.2, 0.6),
      new THREE.Vector3(0, 0.4, 0),
      new THREE.Vector3(2.6, 0.1, -0.5),
      new THREE.Vector3(5.2, 0.9, -1.5),
    ]
    const spline = new THREE.CatmullRomCurve3(curvePoints)
    const tubeGeom = new THREE.TubeGeometry(spline, 140, 0.04, 12, false)
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0xe6c887,
      emissive: 0xaa8833,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
    })
    const tubeMesh = new THREE.Mesh(tubeGeom, tubeMat)
    timelineGroup.add(tubeMesh)

    // Milestone spheres along the curve
    const milestoneTimes = [0.0, 0.25, 0.5, 0.75, 1.0]
    milestoneTimes.forEach((t) => {
      const pos = spline.getPoint(t)
      const mGeom = new THREE.SphereGeometry(0.12, 24, 24)
      const mMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xe6c887,
        emissiveIntensity: 1.2,
        roughness: 0.1,
      })
      const mMesh = new THREE.Mesh(mGeom, mMat)
      mMesh.position.copy(pos)
      timelineGroup.add(mMesh)

      const haloGeom = new THREE.SphereGeometry(0.24, 16, 16)
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0xe6c887,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
      })
      const halo = new THREE.Mesh(haloGeom, haloMat)
      halo.position.copy(pos)
      timelineGroup.add(halo)
    })

    timelineGroup.position.set(0, -2.1, 0)
    timelineGroup.visible = false
    scene.add(timelineGroup)
    timelineGroupRef.current = timelineGroup

    // 8. Scene 4 — Distance (Two Distant Glowing Beacons & Cosmic Bridge)
    const distanceGroup = new THREE.Group()
    distanceGroup.name = 'distance_group'

    // Left Beacon (Nashik)
    const beacon1Geom = new THREE.SphereGeometry(0.42, 32, 32)
    const beacon1Mat = new THREE.MeshStandardMaterial({
      color: 0xd68fa8,
      emissive: 0xd68fa8,
      emissiveIntensity: 1.5,
      roughness: 0.2,
    })
    const beacon1 = new THREE.Mesh(beacon1Geom, beacon1Mat)
    beacon1.position.set(-4.2, 0, 0)
    distanceGroup.add(beacon1)

    const ringGeom = new THREE.TorusGeometry(0.68, 0.02, 16, 48)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd68fa8,
      transparent: true,
      opacity: 0.5,
    })
    const ring1 = new THREE.Mesh(ringGeom, ringMat)
    ring1.rotation.x = Math.PI / 3
    beacon1.add(ring1)

    // Right Beacon
    const beacon2Geom = new THREE.SphereGeometry(0.42, 32, 32)
    const beacon2Mat = new THREE.MeshStandardMaterial({
      color: 0x8e7dbe,
      emissive: 0x8e7dbe,
      emissiveIntensity: 1.5,
      roughness: 0.2,
    })
    const beacon2 = new THREE.Mesh(beacon2Geom, beacon2Mat)
    beacon2.position.set(4.2, 0, 0)
    distanceGroup.add(beacon2)

    const ring2 = new THREE.Mesh(
      ringGeom,
      new THREE.MeshBasicMaterial({
        color: 0x8e7dbe,
        transparent: true,
        opacity: 0.5,
      })
    )
    ring2.rotation.x = -Math.PI / 3
    beacon2.add(ring2)

    // Glowing Undulating Connection Bridge
    const bridgePoints = []
    const bridgeSegments = 70
    for (let i = 0; i <= bridgeSegments; i++) {
      const t = i / bridgeSegments
      const x = -4.2 + t * 8.4
      const y = Math.sin(t * Math.PI) * 0.7
      const z = Math.cos(t * Math.PI * 2) * 0.35
      bridgePoints.push(new THREE.Vector3(x, y, z))
    }
    const bridgeCurve = new THREE.CatmullRomCurve3(bridgePoints)
    const bridgeTubeGeom = new THREE.TubeGeometry(bridgeCurve, 90, 0.035, 10, false)
    const bridgeMat = new THREE.MeshBasicMaterial({
      color: 0xffe8a3,
      transparent: true,
      opacity: 0.85,
    })
    const bridgeMesh = new THREE.Mesh(bridgeTubeGeom, bridgeMat)
    distanceGroup.add(bridgeMesh)

    distanceGroup.visible = false
    scene.add(distanceGroup)
    distanceGroupRef.current = distanceGroup

    // 9. Scene 7 — The 3D Birthday Cake
    const cake = createCakeMesh()
    cake.position.set(0, -0.6, 0)
    cake.visible = false
    scene.add(cake)
    cakeMeshRef.current = cake

    // 10. Mouse & Touch Interaction (Parallax & Gallery Drag)
    const handlePointerMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY
      mouseRef.current.targetX = (clientX / window.innerWidth) * 2 - 1
      mouseRef.current.targetY = -(clientY / window.innerHeight) * 2 + 1

      if (isDraggingGalleryRef.current && currentScene === 5) {
        const deltaX = clientX - lastPointerXRef.current
        galleryRotationRef.current += deltaX * 0.005
        lastPointerXRef.current = clientX
      }
    }

    const handlePointerStart = (e) => {
      if (currentScene === 5) {
        isDraggingGalleryRef.current = true
        lastPointerXRef.current = e.touches ? e.touches[0].clientX : e.clientX
      }
    }

    const handlePointerEnd = () => {
      isDraggingGalleryRef.current = false
    }

    window.addEventListener('mousemove', handlePointerMove, { passive: true })
    window.addEventListener('touchmove', handlePointerMove, { passive: true })
    window.addEventListener('mousedown', handlePointerStart)
    window.addEventListener('touchstart', handlePointerStart, { passive: true })
    window.addEventListener('mouseup', handlePointerEnd)
    window.addEventListener('touchend', handlePointerEnd)

    // Raycasting for 3D card clicks
    const raycaster = new THREE.Raycaster()
    const mouseVector = new THREE.Vector2()

    const handlePointerDown = (e) => {
      if (currentScene !== 5 && currentScene !== 7) return
      const clientX = e.clientX || (e.touches && e.touches[0]?.clientX)
      const clientY = e.clientY || (e.touches && e.touches[0]?.clientY)
      if (clientX === undefined) return

      mouseVector.x = (clientX / window.innerWidth) * 2 - 1
      mouseVector.y = -(clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouseVector, camera)

      // Cake candle tap on Scene 7
      if (currentScene === 7 && cakeMeshRef.current) {
        const cakeIntersects = raycaster.intersectObjects(cakeMeshRef.current.children, true)
        if (cakeIntersects.length > 0) {
          onCandleBlow()
          return
        }
      }

      // Photo card click in gallery (Scene 5)
      const photoObjects = photoMeshesRef.current.flatMap((c) => c.children)
      const intersects = raycaster.intersectObjects(photoObjects, true)

      if (intersects.length > 0) {
        let parent = intersects[0].object
        while (parent && !parent.userData?.isPhotoCard && parent.parent) {
          parent = parent.parent
        }
        if (parent && parent.userData?.photo) {
          onSelectPhoto(parent.userData.photo.id)
        }
      }
    }

    window.addEventListener('click', handlePointerDown)

    const handleResize = () => {
      if (!container || !renderer || !camera) return
      const w = container.clientWidth || window.innerWidth
      const h = container.clientHeight || window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener('resize', handleResize)

    // 11. Main 60 FPS Render & Animation Loop
    let animationFrameId
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const time = clockRef.current.getElapsedTime()

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05

      const target = cameraTargets[currentScene] || cameraTargets[1]
      const parallaxFactorX = window.innerWidth < 768 ? 0.35 : 0.75
      const parallaxFactorY = window.innerWidth < 768 ? 0.25 : 0.55

      let desiredCamPos = target.pos.clone()
      let desiredCamLook = target.look.clone()

      if (selectedPhotoId && currentScene === 5) {
        const selMesh = photoMeshesRef.current.find((m) => m.userData?.photo?.id === selectedPhotoId)
        if (selMesh) {
          desiredCamPos.set(selMesh.position.x, selMesh.position.y, selMesh.position.z + 3.2)
          desiredCamLook.set(selMesh.position.x, selMesh.position.y, selMesh.position.z)
        }
      } else {
        desiredCamPos.x += mouseRef.current.x * parallaxFactorX
        desiredCamPos.y += mouseRef.current.y * parallaxFactorY
      }

      // Dynamic camera speed during scene transitions
      const lerpFactor = THREE.MathUtils.lerp(0.045, 0.085, warpIntensityRef.current)
      currentCamPos.current.lerp(desiredCamPos, lerpFactor)
      currentCamLook.current.lerp(desiredCamLook, lerpFactor)

      camera.position.copy(currentCamPos.current)
      camera.lookAt(currentCamLook.current)

      // Ambient particle drift + warp speed surge during scene transitions
      if (particlesRef.current) {
        particlesRef.current.rotation.y = time * 0.015
        particlesRef.current.rotation.x = Math.sin(time * 0.01) * 0.05
        if (warpIntensityRef.current > 0.01) {
          particlesRef.current.position.z += warpIntensityRef.current * 0.16
          if (particlesRef.current.position.z > 6) {
            particlesRef.current.position.z = -5
          }
          warpIntensityRef.current *= 0.94
        }
      }

      // Animate Cake Flames & Extinguish on Scene 7
      if (cakeMeshRef.current && cakeMeshRef.current.userData) {
        const cakeData = cakeMeshRef.current.userData
        if (cakeData.candleFlames) {
          cakeData.candleFlames.forEach((cf) => {
            if (cakeData.areCandlesLit) {
              const flicker = Math.sin(time * 12 + cf.seed) * 0.12 + Math.cos(time * 18 + cf.seed) * 0.08
              cf.flame.scale.set(1 + flicker * 0.5, 1 + flicker, 1 + flicker * 0.5)
              cf.flame.position.y = cf.basePosY + flicker * 0.02
              cf.glow.scale.set(1 + flicker * 0.8, 1 + flicker * 0.8, 1 + flicker * 0.8)
              cf.light.intensity = 1.8 + flicker * 0.9
            } else {
              cf.flame.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), 0.1)
              cf.glow.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), 0.1)
              cf.light.intensity = THREE.MathUtils.lerp(cf.light.intensity, 0.0, 0.08)
            }
          })
        }
        if (currentScene === 7) {
          cakeMeshRef.current.rotation.y += 0.006
        }
      }

      // Animate Celebratory Sparks
      if (celebratoryParticlesRef.current && celebrationSparks.userData.active) {
        const cData = celebrationSparks.userData
        cData.time += 0.016
        const posAttr = sparkGeom.getAttribute('position')
        const posArr = posAttr.array
        const velArr = cData.velocities

        for (let i = 0; i < sparkCount; i++) {
          posArr[i * 3] += velArr[i * 3]
          posArr[i * 3 + 1] += velArr[i * 3 + 1]
          posArr[i * 3 + 2] += velArr[i * 3 + 2]

          velArr[i * 3 + 1] -= 0.0008
          velArr[i * 3] *= 0.985
          velArr[i * 3 + 2] *= 0.985
        }
        posAttr.needsUpdate = true
        sparkMat.opacity = Math.max(0, 1 - cData.time * 0.15)
        if (cData.time > 7) {
          cData.active = false
        }
      }

      // Distance bridge wave
      if (distanceGroupRef.current && distanceGroupRef.current.visible) {
        distanceGroupRef.current.rotation.y = Math.sin(time * 0.2) * 0.1
        beacon1.rotation.y += 0.015
        beacon2.rotation.y -= 0.015
      }

      // Timeline pulse
      if (timelineGroupRef.current && timelineGroupRef.current.visible) {
        timelineGroupRef.current.rotation.z = Math.sin(time * 0.4) * 0.02
      }

      // 12. Dynamic Positioning of Manisha's 8 Photo Cards (8 Scenes Total)
      const meshes = photoMeshesRef.current
      const count = meshes.length

      if (count > 0) {
        meshes.forEach((card, idx) => {
          let targetPos = new THREE.Vector3()
          let targetRot = new THREE.Euler()
          let targetScale = 1

          if (currentScene === 1) {
            // Scene 1: Distant blurred atmospheric memories
            const angle = (idx / count) * Math.PI * 2
            const r = 9.5
            targetPos.set(
              Math.cos(angle) * r,
              Math.sin(angle * 1.5) * 3.8,
              -14 - (idx % 3) * 3
            )
            targetRot.set(0.1, angle * 0.4, 0.05)
            targetScale = 0.85
          } else if (currentScene === 2) {
            // Scene 2: Statuesque arrangement framing "MANISHA"
            const isLeft = idx < count / 2
            const colIdx = idx % 4
            const xBase = isLeft ? -3.4 - (colIdx % 2) * 1.4 : 3.4 + (colIdx % 2) * 1.4
            const yPositions = [1.6, 0.2, -1.2, -2.4]
            const yPos = yPositions[colIdx]
            const zPos = (colIdx % 2 === 0 ? 0.2 : -0.8) + (isLeft ? 0.1 : -0.1)

            targetPos.set(
              xBase,
              yPos + Math.sin(time * 0.8 + idx) * 0.08,
              zPos
            )
            targetRot.set(
              (colIdx - 1.5) * 0.05,
              (isLeft ? 0.25 : -0.25) + mouseRef.current.x * 0.1,
              (isLeft ? -0.04 : 0.04)
            )
            targetScale = window.innerWidth < 768 ? 0.6 : 0.95
          } else if (currentScene === 3) {
            // Scene 3: Cleanly framing the timeline text from the sides
            const isLeft = idx < count / 2
            const sideIdx = idx % 4
            const x = isLeft ? -3.8 - (sideIdx % 2) * 1.3 : 3.8 + (sideIdx % 2) * 1.3
            const yPositions = [1.5, 0.2, -1.1, -2.3]
            const y = yPositions[sideIdx]
            const z = (sideIdx % 2 === 0 ? 0.3 : -0.8)

            targetPos.set(x, y + Math.sin(time * 0.7 + idx) * 0.08, z)
            targetRot.set(0.05, isLeft ? 0.25 : -0.25, isLeft ? -0.03 : 0.03)
            targetScale = window.innerWidth < 768 ? 0.52 : 0.82
          } else if (currentScene === 4) {
            // Scene 4: Distant cosmic beacons frame
            const isLeft = idx < count / 2
            const subIdx = idx % 4
            const x = isLeft ? -5.2 - (subIdx % 2) * 1.2 : 5.2 + (subIdx % 2) * 1.2
            const y = (subIdx - 1.5) * 1.4
            targetPos.set(x, y, -2.5)
            targetRot.set(0, isLeft ? 0.35 : -0.35, 0)
            targetScale = 0.65
          } else if (currentScene === 5) {
            // Scene 5: 3D Interactive Cylindrical Carousel
            const isMobile = window.innerWidth < 768
            const radius = isMobile ? 4.8 : 6.5
            const baseAngle = (idx / count) * Math.PI * 2 + galleryRotationRef.current
            const x = Math.sin(baseAngle) * radius
            const z = Math.cos(baseAngle) * radius - radius + 1.2
            const y = Math.sin(time * 0.6 + idx) * 0.12

            targetPos.set(x, y, z)
            targetRot.set(0, baseAngle + mouseRef.current.x * 0.15, 0)
            targetScale = isMobile ? 0.8 : 1.05

            if (selectedPhotoId === card.userData?.photo?.id) {
              targetPos.set(0, 0, 3.4)
              targetRot.set(mouseRef.current.y * 0.2, mouseRef.current.x * 0.2, 0)
              targetScale = isMobile ? 1.25 : 1.55
            }
          } else if (currentScene === 6) {
            // Scene 6: The Birthday Message (All 8 photos equally split: 4 on left, 4 on right, facing forward and 100% visible)
            const isLeft = idx < count / 2
            const sideIdx = idx % 4
            const xBase = isLeft ? -4.3 - (sideIdx % 2) * 0.4 : 4.3 + (sideIdx % 2) * 0.4
            const yPositions = [2.0, 0.7, -0.6, -1.9]
            const y = yPositions[sideIdx]
            const z = (sideIdx % 2 === 0 ? 0.2 : -0.4)

            targetPos.set(xBase, y + Math.sin(time * 0.5 + idx) * 0.07, z)
            targetRot.set(0, isLeft ? 0.18 : -0.18, 0)
            targetScale = window.innerWidth < 768 ? 0.52 : 0.75
          } else if (currentScene === 7) {
            // Scene 7: Semicircle crescent surrounding the cake
            const arcAngle = (idx / (count - 1)) * Math.PI * 0.9 + Math.PI * 1.05
            const r = 4.2
            targetPos.set(
              Math.cos(arcAngle) * r,
              Math.sin(arcAngle * 2) * 0.3 + 1.2 + Math.sin(time * 0.5 + idx) * 0.08,
              Math.sin(arcAngle) * r - 1.8
            )
            targetRot.set(0, -arcAngle + Math.PI / 2, 0)
            targetScale = window.innerWidth < 768 ? 0.55 : 0.7
          } else if (currentScene === 8) {
            // Scene 8: Orbiting halo ring around "Happy Birthday Manisha"
            const angle = (idx / count) * Math.PI * 2 + time * 0.12
            const radius = window.innerWidth < 768 ? 3.0 : 4.8
            targetPos.set(
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * 0.5,
              Math.sin(angle) * radius * 0.6 - 0.5
            )
            targetRot.set(0.1, -angle + Math.PI / 2, Math.sin(time + idx) * 0.05)
            targetScale = window.innerWidth < 768 ? 0.65 : 0.85
          }

          card.position.lerp(targetPos, 0.06)
          card.quaternion.slerp(new THREE.Quaternion().setFromEuler(targetRot), 0.06)
          const currentS = card.scale.x
          const newS = THREE.MathUtils.lerp(currentS, targetScale, 0.06)
          card.scale.set(newS, newS, newS)
        })
      }

      // Visibilities
      if (timelineGroupRef.current) timelineGroupRef.current.visible = currentScene === 3
      if (distanceGroupRef.current) distanceGroupRef.current.visible = currentScene === 4
      if (cakeMeshRef.current) cakeMeshRef.current.visible = currentScene === 7

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('touchmove', handlePointerMove)
      window.removeEventListener('mousedown', handlePointerStart)
      window.removeEventListener('touchstart', handlePointerStart)
      window.removeEventListener('mouseup', handlePointerEnd)
      window.removeEventListener('touchend', handlePointerEnd)
      window.removeEventListener('click', handlePointerDown)
      window.removeEventListener('resize', handleResize)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [currentScene, onLoaded, onWebGLUnsupported, onCandleBlow, onSelectPhoto])

  // Trigger warp speed and camera acceleration whenever scene changes
  useEffect(() => {
    warpIntensityRef.current = 1.0
  }, [currentScene])

  useEffect(() => {
    if (candlesBlown && cakeMeshRef.current?.userData?.extinguish) {
      cakeMeshRef.current.userData.extinguish()

      if (celebratoryParticlesRef.current) {
        const cSparks = celebratoryParticlesRef.current
        cSparks.userData.active = true
        cSparks.userData.time = 0
        const posAttr = cSparks.geometry.getAttribute('position')
        const posArr = posAttr.array
        for (let i = 0; i < posArr.length / 3; i++) {
          posArr[i * 3] = (Math.random() - 0.5) * 0.8
          posArr[i * 3 + 1] = 1.2 + Math.random() * 0.4
          posArr[i * 3 + 2] = (Math.random() - 0.5) * 0.8
        }
        posAttr.needsUpdate = true
      }
    }
  }, [candlesBlown])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-auto touch-none overflow-hidden z-0"
      style={{ touchAction: 'none' }}
    />
  )
}
