import * as THREE from "three"
import { BaseTool } from "./BaseTool"
import { getMouseIntersection } from "../interaction/Raycaster"
import { createPoint } from "../objects/Point"
import { Plane } from "../objects/Plane"
import { getNearestSelectablePoint, updatePointHoverCursor } from "../interaction/getNearestSelectablePoint"

export class PlaneTool extends BaseTool {
  selectableObjects: THREE.Object3D[]
  points: THREE.Mesh[] = []

  cursorPreview: THREE.Mesh

  previewPlane: THREE.Mesh | null = null

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

  private updatePreviewPlane(
    pointA: THREE.Mesh,
    pointB: THREE.Mesh,
    currentPoint: THREE.Vector3
  ) {
    const A = pointA.position.clone()
    const B = pointB.position.clone()
    const C = currentPoint.clone()

    const AB = new THREE.Vector3().subVectors(B, A)
    const AC = new THREE.Vector3().subVectors(C, A)

    const normal = new THREE.Vector3().crossVectors(AB, AC)

    if (normal.length() < 0.0001) return

    normal.normalize()

    const center = new THREE.Vector3()
      .addVectors(A, B)
      .add(C)
      .divideScalar(3)

    const width = 4
    const height = 4

    const xAxis = AB.clone().normalize()
    const yAxis = new THREE.Vector3()
      .crossVectors(normal, xAxis)
      .normalize()

    const p1 = center.clone()
      .add(xAxis.clone().multiplyScalar(-width / 2))
      .add(yAxis.clone().multiplyScalar(-height / 2))

    const p2 = center.clone()
      .add(xAxis.clone().multiplyScalar(width / 2))
      .add(yAxis.clone().multiplyScalar(-height / 2))

    const p3 = center.clone()
      .add(xAxis.clone().multiplyScalar(width / 2))
      .add(yAxis.clone().multiplyScalar(height / 2))

    const p4 = center.clone()
      .add(xAxis.clone().multiplyScalar(-width / 2))
      .add(yAxis.clone().multiplyScalar(height / 2))

    const geometry = new THREE.BufferGeometry()

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute([
        p1.x, p1.y, p1.z,
        p2.x, p2.y, p2.z,
        p3.x, p3.y, p3.z,
        p4.x, p4.y, p4.z,
      ], 3)
    )

    geometry.setIndex([
      0, 1, 2,
      0, 2, 3,
    ])

    geometry.computeVertexNormals()

    if (!this.previewPlane) {
      const material = new THREE.MeshStandardMaterial({
        color: 0x00aaff,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
        depthWrite: false,
      })

      this.previewPlane = new THREE.Mesh(geometry, material)
      this.scene.add(this.previewPlane)
      return
    }

    this.previewPlane.geometry.dispose()
    this.previewPlane.geometry = geometry
  }

  private clearPreviewPlane() {
    if (!this.previewPlane) return

    this.scene.remove(this.previewPlane)
    this.previewPlane.geometry.dispose()
    this.previewPlane = null
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
    this.clearPreviewPlane()
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

    if (this.points.length === 2) {
      this.updatePreviewPlane(
        this.points[0],
        this.points[1],
        pos
      )
    }
  }

  onClick(event: MouseEvent) {
    const point = this.getOrCreatePoint(event)

    this.points.push(point)

    if (this.points.length === 3) {
      const plane = new Plane(
        this.points[0],
        this.points[1],
        this.points[2]
      )

      this.scene.add(plane.mesh)
      this.clearPreviewPlane()
      this.points = []
    }
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