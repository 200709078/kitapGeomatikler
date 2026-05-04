import * as THREE from "three"

export class LineSegment {
  startPoint: THREE.Mesh
  endPoint: THREE.Mesh
  mesh: THREE.Mesh

  constructor(startPoint: THREE.Mesh, endPoint: THREE.Mesh) {
    this.startPoint = startPoint
    this.endPoint = endPoint

    const geometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 16)
    const material = new THREE.MeshStandardMaterial({ color: 0x0066ff })

    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.castShadow = true
    this.mesh.receiveShadow = true

    // dependents bağla
    this.startPoint.userData.dependents ??= []
    this.endPoint.userData.dependents ??= []

    this.startPoint.userData.dependents.push(this)
    this.endPoint.userData.dependents.push(this)

    this.update()
  }

  update() {
    const start = this.startPoint.position
    const end = this.endPoint.position

    const direction = new THREE.Vector3().subVectors(end, start)
    const length = direction.length()

    if (length < 0.0001) return

    const midpoint = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5)

    // pozisyon
    this.mesh.position.copy(midpoint)

    // ROTASYON
    const quaternion = new THREE.Quaternion()
    quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize()
    )

    this.mesh.quaternion.copy(quaternion)

    // SCALE (önce sıfırla sonra ver → önemli)
    this.mesh.scale.set(1, 1, 1)
    this.mesh.scale.set(1, length, 1)
  }
}