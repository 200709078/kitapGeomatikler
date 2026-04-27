import * as THREE from "three"

export class AngleObject {
  pointA: THREE.Mesh
  vertexB: THREE.Mesh
  pointC: THREE.Mesh
  arc: THREE.Line

  radius = 0.8

  constructor(pointA: THREE.Mesh, vertexB: THREE.Mesh, pointC: THREE.Mesh) {
    this.pointA = pointA
    this.vertexB = vertexB
    this.pointC = pointC

    const geometry = new THREE.BufferGeometry()
    const material = new THREE.LineBasicMaterial({ color: 0xff6600 })

    this.arc = new THREE.Line(geometry, material)

    this.pointA.userData.angles ??= []
    this.vertexB.userData.angles ??= []
    this.pointC.userData.angles ??= []

    this.pointA.userData.angles.push(this)
    this.vertexB.userData.angles.push(this)
    this.pointC.userData.angles.push(this)

    this.update()
  }

  update() {
    const a = this.pointA.position
    const b = this.vertexB.position
    const c = this.pointC.position

    const v1 = new THREE.Vector3().subVectors(a, b).normalize()
    const v2 = new THREE.Vector3().subVectors(c, b).normalize()

    const angle1 = Math.atan2(v1.z, v1.x)
    const angle2 = Math.atan2(v2.z, v2.x)

    let startAngle = angle1
    let endAngle = angle2

    let diff = endAngle - startAngle

    if (diff < 0) {
      diff += Math.PI * 2
    }

    if (diff > Math.PI) {
      const temp = startAngle
      startAngle = endAngle
      endAngle = temp + Math.PI * 2
      diff = endAngle - startAngle
    }

    const points: THREE.Vector3[] = []
    const segments = 32

    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const angle = startAngle + diff * t

      points.push(
        new THREE.Vector3(
          b.x + Math.cos(angle) * this.radius,
          b.y + 0.03,
          b.z + Math.sin(angle) * this.radius
        )
      )
    }

    this.arc.geometry.dispose()
    this.arc.geometry = new THREE.BufferGeometry().setFromPoints(points)
  }
}