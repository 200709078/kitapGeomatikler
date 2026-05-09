import * as THREE from "three"
import { HEIGHT_POINT_SIZE } from "../interaction/Pointer"
import { getRandomColor } from "../utils/color"

export class Cylinder {
  baseCenterPoint: THREE.Mesh
  radiusPoint: THREE.Mesh
  topCenterPoint: THREE.Mesh

  mesh: THREE.Mesh
  baseLine: THREE.LineLoop
  topLine: THREE.LineLoop
  heightLine: THREE.Line

  height: number

  constructor(
    scene: THREE.Scene,
    selectableObjects: THREE.Object3D[],
    baseCenterPoint: THREE.Mesh,
    radiusPoint: THREE.Mesh
  ) {
    this.baseCenterPoint = baseCenterPoint
    this.radiusPoint = radiusPoint
    this.height = baseCenterPoint.position.distanceTo(radiusPoint.position) * 2
    this.topCenterPoint = this.createPurplePoint(baseCenterPoint.position.clone())

    this.baseCenterPoint.userData.pointRole ??= "free"
    this.radiusPoint.userData.pointRole ??= "free"
    this.topCenterPoint.userData.pointRole = "height"

    scene.add(this.topCenterPoint)
    selectableObjects.push(this.topCenterPoint)

    this.mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 1, 64, 1, false),
      new THREE.MeshStandardMaterial({
        color: getRandomColor(),
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide,
      })
    )
    this.mesh.userData.selectableType = "solid"
    this.mesh.userData.owner = this
    selectableObjects.push(this.mesh)

    this.baseLine = new THREE.LineLoop(
      new THREE.BufferGeometry(),
      new THREE.LineBasicMaterial({ color: 0x000000 })
    )

    this.topLine = new THREE.LineLoop(
      new THREE.BufferGeometry(),
      new THREE.LineBasicMaterial({ color: 0x000000 })
    )

    this.heightLine = new THREE.Line(
      new THREE.BufferGeometry(),
      new THREE.LineDashedMaterial({
        color: 0x800080,
        dashSize: 0.15,
        gapSize: 0.1,
      })
    )

    scene.add(this.mesh)
    scene.add(this.baseLine)
    scene.add(this.topLine)
    scene.add(this.heightLine)

    this.baseCenterPoint.userData.dependents ??= []
    this.radiusPoint.userData.dependents ??= []
    this.topCenterPoint.userData.dependents ??= []

    this.baseCenterPoint.userData.dependents.push(this)
    this.radiusPoint.userData.dependents.push(this)

    this.update()
  }

  moveAlongNormal(delta: number) {
    this.height = Math.max(0.05, this.height + delta)
    this.update()
  }

  update() {
    const radius = this.getRadius()

    if (radius < 0.0001) return

    const baseCenter = this.baseCenterPoint.position.clone()
    const heightDirection = this.getHeightDirection()
    const topCenter = baseCenter.clone().add(heightDirection.clone().multiplyScalar(this.height))

    this.topCenterPoint.position.copy(topCenter)
    this.updateDependentsOf(this.topCenterPoint)

    this.mesh.position.copy(
      new THREE.Vector3().addVectors(baseCenter, topCenter).multiplyScalar(0.5)
    )
    this.mesh.scale.set(radius, this.height, radius)
    this.mesh.quaternion.copy(
      new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        heightDirection
      )
    )

    this.updateCircleLines(baseCenter, topCenter, radius, heightDirection)
    this.updateHeightLine(baseCenter, topCenter)
  }

  getHeightDirection() {
    const radiusDirection = new THREE.Vector3()
      .subVectors(this.radiusPoint.position, this.baseCenterPoint.position)

    if (radiusDirection.length() < 0.0001) {
      return new THREE.Vector3(0, 1, 0)
    }

    radiusDirection.normalize()

    const worldUp = new THREE.Vector3(0, 1, 0)
    const heightDirection = worldUp.sub(
      radiusDirection.clone().multiplyScalar(worldUp.dot(radiusDirection))
    )

    if (heightDirection.length() < 0.0001) {
      return new THREE.Vector3(1, 0, 0)
    }

    return heightDirection.normalize()
  }

  private getRadius() {
    return this.baseCenterPoint.position.distanceTo(this.radiusPoint.position)
  }

  private updateCircleLines(
    baseCenter: THREE.Vector3,
    topCenter: THREE.Vector3,
    radius: number,
    heightDirection: THREE.Vector3
  ) {
    const basePoints = this.createCirclePoints(baseCenter, radius, heightDirection)
    const topPoints = this.createCirclePoints(topCenter, radius, heightDirection)

    this.baseLine.geometry.dispose()
    this.baseLine.geometry = new THREE.BufferGeometry().setFromPoints(basePoints)

    this.topLine.geometry.dispose()
    this.topLine.geometry = new THREE.BufferGeometry().setFromPoints(topPoints)
  }

  private updateHeightLine(baseCenter: THREE.Vector3, topCenter: THREE.Vector3) {
    this.heightLine.geometry.dispose()
    this.heightLine.geometry = new THREE.BufferGeometry().setFromPoints([
      baseCenter,
      topCenter,
    ])
    this.heightLine.computeLineDistances()
  }

  private createCirclePoints(
    center: THREE.Vector3,
    radius: number,
    heightDirection: THREE.Vector3
  ) {
    const points: THREE.Vector3[] = []
    const segments = 96
    const radiusDirection = new THREE.Vector3()
      .subVectors(this.radiusPoint.position, this.baseCenterPoint.position)
      .normalize()
    const tangentDirection = new THREE.Vector3()
      .crossVectors(heightDirection, radiusDirection)
      .normalize()

    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2

      points.push(
        center
          .clone()
          .add(radiusDirection.clone().multiplyScalar(Math.cos(angle) * radius))
          .add(tangentDirection.clone().multiplyScalar(Math.sin(angle) * radius))
      )
    }

    return points
  }

  private createPurplePoint(position: THREE.Vector3) {
    const geometry = new THREE.SphereGeometry(HEIGHT_POINT_SIZE, 24, 24)
    const material = new THREE.MeshStandardMaterial({
      color: 0x800080,
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.copy(position)

    mesh.userData.pointRole = "height"
    mesh.userData.lockMouseDrag = true
    mesh.userData.normalWheelController = this
    mesh.userData.dependents ??= []

    return mesh
  }

  private updateDependentsOf(object: THREE.Object3D) {
    object.userData.dependents?.forEach((dependent: any) => {
      if (dependent === this) return
      dependent.update?.()
    })
  }
}
