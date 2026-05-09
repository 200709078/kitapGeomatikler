import * as THREE from "three"
import { getRandomColor } from "../utils/color"

export class LineObject {
  pointA: THREE.Mesh
  pointB: THREE.Mesh
  mesh: THREE.Mesh
  length: number

  constructor(
    pointA: THREE.Mesh,
    pointB: THREE.Mesh,
    length = 100,
    selectableObjects?: THREE.Object3D[]
  ) {
    this.pointA = pointA
    this.pointB = pointB
    this.length = length

    const geometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 16)
    const material = new THREE.MeshStandardMaterial({ color: getRandomColor() })

    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.castShadow = true
    this.mesh.receiveShadow = true
    this.mesh.userData.selectableType = "solid"
    this.mesh.userData.owner = this

    selectableObjects?.push(this.mesh)

    this.pointA.userData.dependents ??= []
    this.pointB.userData.dependents ??= []

    this.pointA.userData.dependents.push(this)
    this.pointB.userData.dependents.push(this)

    this.update()
  }

  update() {
    const a = this.pointA.position
    const b = this.pointB.position

    const direction = new THREE.Vector3()
      .subVectors(b, a)
      .normalize()

    const center = new THREE.Vector3()
      .addVectors(a, b)
      .multiplyScalar(0.5)

    this.mesh.position.copy(center)

    this.mesh.scale.set(1, this.length, 1)

    const quaternion = new THREE.Quaternion()
    quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction
    )

    this.mesh.quaternion.copy(quaternion)
  }
}
