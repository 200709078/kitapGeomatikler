import * as THREE from "three"

export class LineSegment {
  startPoint: THREE.Mesh
  endPoint: THREE.Mesh
  mesh: THREE.Mesh

  constructor(startPoint: THREE.Mesh, endPoint: THREE.Mesh) {
    this.startPoint = startPoint
    this.endPoint = endPoint

    const geometry = new THREE.CylinderGeometry(0.035, 0.035, 1, 16)
    const material = new THREE.MeshStandardMaterial({ color: 0x0066ff })

    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.castShadow = true
    this.mesh.receiveShadow = true

    this.startPoint.userData.lineSegments ??= []
    this.endPoint.userData.lineSegments ??= []

    this.startPoint.userData.lineSegments.push(this)
    this.endPoint.userData.lineSegments.push(this)

    this.update()
  }

  update() {
    const start = this.startPoint.position
    const end = this.endPoint.position

    const direction = new THREE.Vector3().subVectors(end, start)
    const length = direction.length()

    const midpoint = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5)

    this.mesh.position.copy(midpoint)

    this.mesh.scale.set(1, length, 1)

    const quaternion = new THREE.Quaternion()
    quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize()
    )

    this.mesh.quaternion.copy(quaternion)
  }
}