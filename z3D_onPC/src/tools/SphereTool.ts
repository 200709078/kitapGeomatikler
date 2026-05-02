import * as THREE from "three"
import { BaseTool } from "./BaseTool"
import { getMouseIntersection } from "../interaction/Raycaster"
import { createPoint } from "../objects/Point"
import { LineSegment } from "../objects/LineSegment"
import { SphereObject } from "../objects/Sphere"

export class SphereTool extends BaseTool {
  selectableObjects: THREE.Object3D[]

  centerPoint: THREE.Mesh | null = null

  cursorPreview: THREE.Mesh
  radiusPreview: THREE.Line | null = null
  spherePreview: THREE.Mesh | null = null

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
    if (this.radiusPreview) {
      this.scene.remove(this.radiusPreview)
      this.radiusPreview = null
    }

    if (this.spherePreview) {
      this.scene.remove(this.spherePreview)
      this.spherePreview = null
    }

    this.centerPoint = null
    this.cursorPreview.visible = false
  }

  onMouseMove(event: MouseEvent) {
    const pos = getMouseIntersection(event, this.camera)

    this.cursorPreview.position.copy(pos)
    this.cursorPreview.visible = true

    if (!this.centerPoint) return

    const points = [this.centerPoint.position, pos]

    if (this.radiusPreview) {
      this.scene.remove(this.radiusPreview)
    }

    const radiusGeometry = new THREE.BufferGeometry().setFromPoints(points)
    const radiusMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 })

    this.radiusPreview = new THREE.Line(radiusGeometry, radiusMaterial)
    this.scene.add(this.radiusPreview)

    const radius = this.centerPoint.position.distanceTo(pos)

    if (!this.spherePreview) {
      const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
      const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0x44aa88,
        transparent: true,
        opacity: 0.35,
      })

      this.spherePreview = new THREE.Mesh(sphereGeometry, sphereMaterial)
      this.scene.add(this.spherePreview)
    }

    this.spherePreview.position.copy(this.centerPoint.position)
    this.spherePreview.scale.set(radius, radius, radius)
  }

  onClick(_event: MouseEvent) {
    const pos = this.cursorPreview.position.clone()

    if (!this.centerPoint) {
      const center = createPoint(pos)
      this.scene.add(center)
      this.selectableObjects.push(center)

      this.centerPoint = center
      return
    }

    const surfacePoint = createPoint(pos)
    this.scene.add(surfacePoint)
    this.selectableObjects.push(surfacePoint)

    const radiusSegment = new LineSegment(this.centerPoint, surfacePoint)
    this.scene.add(radiusSegment.mesh)

    const sphere = new SphereObject(this.centerPoint, surfacePoint)
    this.scene.add(sphere.mesh)

    this.reset()
  }
}