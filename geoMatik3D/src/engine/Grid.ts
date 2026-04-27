import * as THREE from "three"

export function createGrid(scene: THREE.Scene) {
  const grid = new THREE.GridHelper(50, 50)
  scene.add(grid)
}