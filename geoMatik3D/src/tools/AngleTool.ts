import * as THREE from "three"
import { BaseTool } from "./BaseTool"
import { createPoint } from "../objects/Point"
import { AngleObject } from "../objects/Angle"
import { getNearestSelectablePoint, getPointerIntersection, getPointerPointSize, PREVIEW_POINT_SIZE, shouldShowPointerPreview, updatePointCursor } from "../interaction/Pointer"

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

    const geo = new THREE.SphereGeometry(PREVIEW_POINT_SIZE, 16, 16)
    const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 })

    this.cursorPreview = new THREE.Mesh(geo, mat)
  }

  onPointerMove(event: PointerEvent) {
    updatePointCursor(event, this.camera, this.selectableObjects)

    if (!shouldShowPointerPreview(event)) {
      this.cursorPreview.visible = false
      return
    }

    const pos = getPointerIntersection(event, this.camera)

    this.cursorPreview.position.copy(pos)
    this.cursorPreview.visible = true

    if (this.points.length === 1) {
      this.updatePreviewLine(this.points[0].position.clone(), pos, "AB")
    }

    if (this.points.length === 2) {
      this.updatePreviewLine(
        this.points[0].position.clone(),
        this.points[1].position.clone(),
        "AB"
      )
      this.updatePreviewLine(this.points[1].position.clone(), pos, "BC")
    }
  }
  onMouseMove(_event: MouseEvent) { }

  onPointerDown(event: PointerEvent) {
    const existingPoint = getNearestSelectablePoint(
      event,
      this.camera,
      this.selectableObjects
    )

    let point: THREE.Mesh

    if (existingPoint) {
      this.selectPoint(existingPoint)
      point = existingPoint
    } else {
      const pos = getPointerIntersection(event, this.camera)

      point = createPoint(pos, getPointerPointSize(event))

      this.scene.add(point)
      this.selectableObjects.push(point)
    }

    if (this.hasPoint(point)) {
      if (!existingPoint) this.removeCreatedPoint(point)
      return
    }

    this.points.push(point)

    if (this.points.length === 3) {
      const angle = new AngleObject(
        this.points[0],
        this.points[1],
        this.points[2],
        this.selectableObjects
      )

      this.scene.add(angle.lineAB)
      this.scene.add(angle.lineBC)
      this.scene.add(angle.arc)

      this.clearPreviewLines()
      this.points = []
      this.complete()
    }
  }

  onClick(event: MouseEvent) { this.onPointerDown(event as PointerEvent) }

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

  updatePreviewLine(
    start: THREE.Vector3,
    end: THREE.Vector3,
    type: "AB" | "BC"
  ) {
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end])
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 })

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

  private removeCreatedPoint(point: THREE.Mesh) {
    this.scene.remove(point)
    const index = this.selectableObjects.indexOf(point)
    if (index >= 0) this.selectableObjects.splice(index, 1)
    point.geometry.dispose()
  }

  private hasPoint(point: THREE.Mesh) {
    return this.points.some((existing) =>
      existing === point || existing.position.distanceTo(point.position) < 0.001
    )
  }
}
