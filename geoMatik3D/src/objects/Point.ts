import * as THREE from "three"

export function createPoint(position: THREE.Vector3) {
  const geo = new THREE.SphereGeometry(0.50, 50, 50)
  const mat = new THREE.MeshStandardMaterial({ color: 0x0066ff })

  const mesh = new THREE.Mesh(geo, mat)
  mesh.position.copy(position)

  mesh.userData.pointRole = "free"
  mesh.userData.dependents ??= []

  return mesh
}