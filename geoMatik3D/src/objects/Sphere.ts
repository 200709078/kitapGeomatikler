import * as THREE from "three"

export class SphereObject {
  centerPoint: THREE.Mesh
  surfacePoint: THREE.Mesh
  mesh: THREE.Mesh

  constructor(centerPoint: THREE.Mesh, surfacePoint: THREE.Mesh) {
    this.centerPoint = centerPoint
    this.surfacePoint = surfacePoint

    const geometry = new THREE.SphereGeometry(1, 32, 32)
    const material = new THREE.MeshStandardMaterial({
      color: 0x44aa88,
      transparent: true,
      opacity: 0.55,
    })

    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.castShadow = true
    this.mesh.receiveShadow = true

    /*     this.centerPoint.userData.spheres ??= []
        this.surfacePoint.userData.spheres ??= []
    
        this.centerPoint.userData.spheres.push(this)
        this.surfacePoint.userData.spheres.push(this) */

    this.centerPoint.userData.dependents ??= []
    this.surfacePoint.userData.dependents ??= []

    this.centerPoint.userData.dependents.push(this)
    this.surfacePoint.userData.dependents.push(this)

    this.update()
  }

  update() {
    const center = this.centerPoint.position
    const surface = this.surfacePoint.position

    const radius = center.distanceTo(surface)

    this.mesh.position.copy(center)
    this.mesh.scale.set(radius, radius, radius)
  }
}