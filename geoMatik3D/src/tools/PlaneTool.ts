import * as THREE from "three"
import { BaseTool } from "./BaseTool"
import { getMouseIntersection } from "../interaction/Raycaster"
import { createPoint } from "../objects/Point"
import { Plane } from "../objects/Plane"

export class PlaneTool extends BaseTool {
  selectableObjects: THREE.Object3D[]
  points: THREE.Mesh[] = []

  cursorPreview: THREE.Mesh

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
    this.points = []
    this.cursorPreview.visible = false
  }

  onMouseMove(event: MouseEvent) {
    const pos = getMouseIntersection(event, this.camera)

    this.cursorPreview.position.copy(pos)
    this.cursorPreview.visible = true
  }

  onClick(_event: MouseEvent) {
    const pos = this.cursorPreview.position.clone()

    const point = createPoint(pos)
    this.scene.add(point)
    this.selectableObjects.push(point)

    this.points.push(point)

    if (this.points.length === 3) {
      const plane = new Plane(
        this.points[0],
        this.points[1],
        this.points[2]
      )

      this.scene.add(plane.mesh)
      this.points = []
    }
  }
}