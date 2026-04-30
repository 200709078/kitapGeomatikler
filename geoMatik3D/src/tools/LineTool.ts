import * as THREE from "three"
import { BaseTool } from "./BaseTool"
import { getMouseIntersection } from "../interaction/Raycaster"
import { createPoint } from "../objects/Point"
import { LineObject } from "../objects/Line"
import { getNearestSelectablePoint, updatePointHoverCursor } from "../interaction/getNearestSelectablePoint"

export class LineTool extends BaseTool {
  selectableObjects: THREE.Object3D[]

  pointA: THREE.Mesh | null = null

  cursorPreview: THREE.Mesh
  previewLine: THREE.Line | null = null

  constructor(
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    selectableObjects: THREE.Object3D[]
  ) {
    super(scene, camera)
    this.selectableObjects = selectableObjects

    const geo = new THREE.SphereGeometry(0.1, 16, 16)
    const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 })

    this.cursorPreview = new THREE.Mesh(geo, mat)
  }

  activate() {
    this.cursorPreview.visible = false

    if (!this.cursorPreview.parent) {
      this.scene.add(this.cursorPreview)
    }
  }

  deactivate() {
    this.reset()

    if (this.cursorPreview.parent) {
      this.scene.remove(this.cursorPreview)
    }
  }

  reset() {
    if (this.previewLine) {
      this.scene.remove(this.previewLine)
      this.previewLine.geometry.dispose()
      this.previewLine = null
    }

    this.pointA = null
    this.cursorPreview.visible = false
  }

  onMouseMove(event: MouseEvent) {

    updatePointHoverCursor(
      event,
      this.camera,
      this.selectableObjects
    )

    const pos = getMouseIntersection(event, this.camera)

    this.cursorPreview.position.copy(pos)
    this.cursorPreview.visible = true

    if (!this.pointA) return

    const a = this.pointA.position
    const b = pos

    const direction = new THREE.Vector3()
      .subVectors(b, a)
      .normalize()

    const length = 100

    const start = a.clone().add(direction.clone().multiplyScalar(-length / 2))
    const end = a.clone().add(direction.clone().multiplyScalar(length / 2))

    if (this.previewLine) {
      this.scene.remove(this.previewLine)
      this.previewLine.geometry.dispose()
    }

    const geometry = new THREE.BufferGeometry().setFromPoints([start, end])
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 })

    this.previewLine = new THREE.Line(geometry, material)
    this.scene.add(this.previewLine)
  }

  onClick(event: MouseEvent) {
    const point = this.getOrCreatePoint(event)

    if (!this.pointA) {
      this.pointA = point
      return
    }

    const line = new LineObject(this.pointA, point, 100)
    this.scene.add(line.mesh)

    this.reset()
  }

  private getOrCreatePoint(event: MouseEvent) {
    const existingPoint = getNearestSelectablePoint(
      event,
      this.camera,
      this.selectableObjects
    )

    if (existingPoint) {
      return existingPoint
    }

    const pos = this.cursorPreview.position.clone()
    const point = createPoint(pos)

    this.scene.add(point)
    this.selectableObjects.push(point)

    return point
  }
}