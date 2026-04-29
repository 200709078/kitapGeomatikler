import * as THREE from "three"
import { BaseTool } from "./BaseTool"
import { getMouseIntersection } from "../interaction/Raycaster"
import { createPoint } from "../objects/Point"
import { AngleObject } from "../objects/Angle"
import { getNearestSelectablePoint, updatePointHoverCursor } from "../interaction/getNearestSelectablePoint"

export class AngleTool extends BaseTool {
  points: THREE.Mesh[] = []
  selectableObjects: THREE.Object3D[]

  cursorPreview: THREE.Mesh
  previewLineAB: THREE.Line | null = null
  previewLineBC: THREE.Line | null = null

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

  onMouseMove(event: MouseEvent) {

    updatePointHoverCursor(
      event,
      this.camera,
      this.selectableObjects
    )

    const pos = getMouseIntersection(event, this.camera)

    this.cursorPreview.position.copy(pos)
    this.cursorPreview.visible = true

    if (this.points.length === 1) {
      this.updatePreviewLine(
        this.points[0].position.clone(),
        pos.clone(),
        "AB"
      )
    }

    if (this.points.length === 2) {
      this.updatePreviewLine(
        this.points[0].position.clone(),
        this.points[1].position.clone(),
        "AB"
      )

      this.updatePreviewLine(
        this.points[1].position.clone(),
        pos.clone(),
        "BC"
      )
    }
  }

  onClick(event: MouseEvent) {
    const existingPoint = getNearestSelectablePoint(
      event,
      this.camera,
      this.selectableObjects,
      0.35
    )

    let point: THREE.Mesh

    if (existingPoint) {
      point = existingPoint
    } else {
      const pos = this.cursorPreview.position.clone()

      point = createPoint(pos)

      this.scene.add(point)
      this.selectableObjects.push(point)
    }

    this.points.push(point)

    if (this.points.length === 3) {
      const angle = new AngleObject(
        this.points[0],
        this.points[1],
        this.points[2]
      )

      this.scene.add(angle.lineAB)
      this.scene.add(angle.lineBC)
      this.scene.add(angle.arc)

      this.clearPreviewLines()
      this.points = []
    }
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
    this.clearPreviewLines()
  }

  private updatePreviewLine(
    start: THREE.Vector3,
    end: THREE.Vector3,
    type: "AB" | "BC"
  ) {
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end])
    const material = new THREE.LineBasicMaterial({ color: 0x000000 })

    if (type === "AB") {
      if (this.previewLineAB) {
        this.scene.remove(this.previewLineAB)
        this.previewLineAB.geometry.dispose()
      }

      this.previewLineAB = new THREE.Line(geometry, material)
      this.scene.add(this.previewLineAB)
      return
    }

    if (this.previewLineBC) {
      this.scene.remove(this.previewLineBC)
      this.previewLineBC.geometry.dispose()
    }

    this.previewLineBC = new THREE.Line(geometry, material)
    this.scene.add(this.previewLineBC)
  }

  private clearPreviewLines() {
    if (this.previewLineAB) {
      this.scene.remove(this.previewLineAB)
      this.previewLineAB.geometry.dispose()
      this.previewLineAB = null
    }

    if (this.previewLineBC) {
      this.scene.remove(this.previewLineBC)
      this.previewLineBC.geometry.dispose()
      this.previewLineBC = null
    }
  }
}