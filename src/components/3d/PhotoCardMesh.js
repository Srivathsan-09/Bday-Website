import * as THREE from 'three'

/**
 * Creates a photorealistic 3D physical photo card with frame, borders, and backplate.
 * Preserves the exact aspect ratio and image fidelity without cropping faces.
 */
export function createPhotoCardMesh(texture, photoData, options = {}) {
  const {
    width = 2.4,
    borderWidth = 0.08,
    frameColor = 0xffffff,
    frameRoughness = 0.8,
    cardThickness = 0.02,
  } = options

  // Calculate height from image aspect ratio
  const aspect = photoData.aspect || (texture.image ? texture.image.width / texture.image.height : 1)
  const height = width / aspect

  const cardGroup = new THREE.Group()
  cardGroup.name = `photo_card_${photoData.id}`

  // 1. Photo Surface Plane
  const photoGeom = new THREE.PlaneGeometry(width, height, 8, 8)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.generateMipmaps = true

  const photoMat = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.35,
    metalness: 0.05,
    side: THREE.FrontSide,
  })

  const photoMesh = new THREE.Mesh(photoGeom, photoMat)
  photoMesh.position.z = cardThickness * 0.5 + 0.002
  photoMesh.castShadow = true
  cardGroup.add(photoMesh)

  // 2. Physical Matte Border & Backing Box
  const totalW = width + borderWidth * 2
  const totalH = height + borderWidth * 2
  const frameGeom = new THREE.BoxGeometry(totalW, totalH, cardThickness)

  const frameMat = new THREE.MeshStandardMaterial({
    color: frameColor,
    roughness: frameRoughness,
    metalness: 0.1,
  })

  // Dark backing material
  const backMat = new THREE.MeshStandardMaterial({
    color: 0x14121d,
    roughness: 0.9,
    metalness: 0.1,
  })

  const frameMaterials = [
    frameMat, // right
    frameMat, // left
    frameMat, // top
    frameMat, // bottom
    frameMat, // front (matte border)
    backMat,  // back
  ]

  const frameMesh = new THREE.Mesh(frameGeom, frameMaterials)
  frameMesh.castShadow = true
  frameMesh.receiveShadow = true
  cardGroup.add(frameMesh)

  // 3. Subtle metallic champagne rim accent
  const rimGeom = new THREE.BoxGeometry(totalW + 0.02, totalH + 0.02, cardThickness * 0.7)
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xe6c887,
    metalness: 0.8,
    roughness: 0.25,
    transparent: true,
    opacity: 0.45,
  })
  const rimMesh = new THREE.Mesh(rimGeom, rimMat)
  rimMesh.position.z = -0.002
  cardGroup.add(rimMesh)

  // Store metadata for raycasting / interactive inspection
  cardGroup.userData = {
    photo: photoData,
    initialPos: new THREE.Vector3(),
    initialRot: new THREE.Euler(),
    isPhotoCard: true,
    targetScale: 1,
    currentScale: 1,
  }

  return cardGroup
}
