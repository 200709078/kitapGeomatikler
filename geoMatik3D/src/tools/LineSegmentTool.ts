import * as THREE from "three"
import { BaseTool } from "./BaseTool"
import { getMouseIntersection } from "../interaction/Raycaster"
import { createPoint } from "../objects/Point"
import { LineSegment } from "../objects/LineSegment"


export class LineSegmentTool extends BaseTool {
    previewLine: THREE.Line | null = null
    startPoint: THREE.Vector3 | null = null
    cursorPreview: THREE.Mesh
    startPointMesh: THREE.Mesh | null = null
    selectableObjects: THREE.Object3D[]
    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, selectableObjects: THREE.Object3D[]) {
        super(scene, camera)
        this.selectableObjects = selectableObjects
        const geo = new THREE.SphereGeometry(0.1, 16, 16)
        const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 })

        this.cursorPreview = new THREE.Mesh(geo, mat)
    }

    onClick(event: MouseEvent) {
        const pos = getMouseIntersection(event, this.camera)
        if (!this.startPoint) {
            this.startPoint = pos
            const startMesh = createPoint(pos)
            this.scene.add(startMesh)
            this.selectableObjects.push(startMesh)
            this.startPointMesh = startMesh
            return
        }
        const endPoint = pos
        const endMesh = createPoint(endPoint)
        this.selectableObjects.push(endMesh)
        this.scene.add(endMesh)

        const lineSegment = new LineSegment(this.startPointMesh!, endMesh)
        this.scene.add(lineSegment.mesh)

        if (this.previewLine) {
            this.scene.remove(this.previewLine)
            this.previewLine = null
        }

        this.startPoint = null
        this.startPointMesh = null
    }
    onMouseMove(event: MouseEvent) {
        const pos = getMouseIntersection(event, this.camera)

        this.cursorPreview.position.copy(pos)
        this.cursorPreview.visible = true

        if (!this.startPoint) return

        const points = [this.startPoint, pos]
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        if (this.previewLine) {
            this.scene.remove(this.previewLine)
        }
        const material = new THREE.LineBasicMaterial({ color: 0xff0000 })
        this.previewLine = new THREE.Line(geometry, material)

        this.scene.add(this.previewLine)
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
            this.previewLine = null
        }

        this.startPoint = null
        this.startPointMesh = null
        this.cursorPreview.visible = false
    }

}