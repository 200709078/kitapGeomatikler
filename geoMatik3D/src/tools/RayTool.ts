import * as THREE from "three"
import { BaseTool } from "./BaseTool"
import { getMouseIntersection } from "../interaction/Raycaster"
import { createPoint } from "../objects/Point"
import { RayObject } from "../objects/Ray"
import { getNearestSelectablePoint, updatePointHoverCursor } from "../interaction/getNearestSelectablePoint"

export class RayTool extends BaseTool {
  startPoint: THREE.Vector3 | null = null
  startPointMesh: THREE.Mesh | null = null
  selectableObjects: THREE.Object3D[]

  cursorPreview: THREE.Mesh
  previewRay: THREE.Line | null = null

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
    if (this.previewRay) {
      this.scene.remove(this.previewRay)
      this.previewRay.geometry.dispose()
      this.previewRay = null
    }

    this.startPoint = null
    this.startPointMesh = null
    this.cursorPreview.visible = false
  }

  onMouseMove(event: MouseEvent) {
    updatePointHoverCursor(
      event,
      this.camera,
      this.selectableObjects,

    )
    const pos = getMouseIntersection(event, this.camera)

    this.cursorPreview.position.copy(pos)
    this.cursorPreview.visible = true

    if (!this.startPoint) return

    const direction = new THREE.Vector3()
      .subVectors(pos, this.startPoint)
      .normalize()

    const end = new THREE.Vector3()
      .copy(this.startPoint)
      .add(direction.multiplyScalar(50))

    const points = [this.startPoint.clone(), end]
    const geometry = new THREE.BufferGeometry().setFromPoints(points)

    if (this.previewRay) {
      this.scene.remove(this.previewRay)
      this.previewRay.geometry.dispose()
    }

    const material = new THREE.LineBasicMaterial({ color: 0xff0000 })
    this.previewRay = new THREE.Line(geometry, material)

    this.scene.add(this.previewRay)
  }

  onClick(event: MouseEvent) {
    const point = this.getOrCreatePoint(event)

    if (!this.startPointMesh) {
      this.startPointMesh = point
      this.startPoint = point.position.clone()
      return
    }

    const ray = new RayObject(this.startPointMesh, point, 50)
    this.scene.add(ray.mesh)

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