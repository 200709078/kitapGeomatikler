import * as THREE from "three"

export function createPlane(scene: THREE.Scene) {
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshStandardMaterial({ color: 0xdddddd })
  )

  plane.rotation.x = -Math.PI / 2
  plane.receiveShadow = true

  scene.add(plane)
}