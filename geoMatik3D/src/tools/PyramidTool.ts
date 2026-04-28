import * as THREE from "three"
import { BaseTool } from "./BaseTool"
import { getMouseIntersection } from "../interaction/Raycaster"
import { createPoint } from "../objects/Point"
import { LineSegment } from "../objects/LineSegment"
import { Pyramid } from "../objects/Pyramid"

export class PyramidTool extends BaseTool {
  selectableObjects: THREE.Object3D[]
  sideCount = 4

  pointA: THREE.Mesh | null = null

  cursorPreview: THREE.Mesh
  edgePreview: THREE.Line | null = null
  pyramidPreview: THREE.Mesh | null = null

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
    if (this.edgePreview) {
      this.scene.remove(this.edgePreview)
      this.edgePreview.geometry.dispose()
      this.edgePreview = null
    }

    if (this.pyramidPreview) {
      this.scene.remove(this.pyramidPreview)
      this.pyramidPreview.geometry.dispose()
      this.pyramidPreview = null
    }

    this.pointA = null
    this.cursorPreview.visible = false
  }

  onMouseMove(event: MouseEvent) {
    const pos = getMouseIntersection(event, this.camera)

    this.cursorPreview.position.copy(pos)
    this.cursorPreview.visible = true

    if (!this.pointA) return

    const pointAPos = this.pointA.position.clone()
    const pointBPos = pos.clone()

    const sideLength = pointAPos.distanceTo(pointBPos)

    if (sideLength < 0.001) return

    this.updateEdgePreview(pointAPos, pointBPos)
    this.updatePyramidPreview(pointAPos, pointBPos, sideLength)
  }

  onClick(_event: MouseEvent) {
    const pos = this.cursorPreview.position.clone()

    if (!this.pointA) {
      const pointA = createPoint(pos)
      this.scene.add(pointA)
      this.selectableObjects.push(pointA)

      this.pointA = pointA
      return
    }

    const pointB = createPoint(pos)
    this.scene.add(pointB)
    this.selectableObjects.push(pointB)

    const edge = new LineSegment(this.pointA, pointB)
    this.scene.add(edge.mesh)

    const sideLength = this.pointA.position.distanceTo(pointB.position)
    const height = sideLength

    const pyramid = new Pyramid(
      this.pointA,
      pointB,
      this.sideCount,
      height
    )

    this.scene.add(pyramid.mesh)

    this.reset()
  }

  private updateEdgePreview(pointA: THREE.Vector3, pointB: THREE.Vector3) {
    if (this.edgePreview) {
      this.scene.remove(this.edgePreview)
      this.edgePreview.geometry.dispose()
      this.edgePreview = null
    }

    const geometry = new THREE.BufferGeometry().setFromPoints([pointA, pointB])
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 })

    this.edgePreview = new THREE.Line(geometry, material)
    this.scene.add(this.edgePreview)
  }

  private updatePyramidPreview(
    pointA: THREE.Vector3,
    pointB: THREE.Vector3,
    sideLength: number
  ) {
    if (this.pyramidPreview) {
      this.scene.remove(this.pyramidPreview)
      this.pyramidPreview.geometry.dispose()
      this.pyramidPreview = null
    }

    const height = sideLength

    const tempA = new THREE.Mesh()
    tempA.position.copy(pointA)

    const tempB = new THREE.Mesh()
    tempB.position.copy(pointB)

    const previewPyramid = new Pyramid(
      tempA,
      tempB,
      this.sideCount,
      height
    )

    previewPyramid.mesh.material = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    })

    this.pyramidPreview = previewPyramid.mesh
    this.scene.add(this.pyramidPreview)
  }
}