import * as THREE from "three"
import { BaseTool } from "./BaseTool"
import { getMouseIntersection } from "../interaction/Raycaster"
import { createPoint } from "../objects/Point"
import { RayObject } from "../objects/RayObject"

export class RayTool extends BaseTool {
    startPoint: THREE.Vector3 | null = null
    startPointMesh: THREE.Mesh | null = null
    selectableObjects: THREE.Object3D[]

    cursorPreview: THREE.Mesh
    previewRay: THREE.Line | null = null

    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, selectableObjects: THREE.Object3D[]) {
        super(scene, camera)
        this.selectableObjects = selectableObjects
        const geo = new THREE.SphereGeometry(0.1, 16, 16)
        const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 })

        this.cursorPreview = new THREE.Mesh(geo, mat)
    }

    onMouseMove(event: MouseEvent) {
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

        const points = [this.startPoint, end]
        const geometry = new THREE.BufferGeometry().setFromPoints(points)

        if (this.previewRay) {
            this.scene.remove(this.previewRay)
        }

        const material = new THREE.LineBasicMaterial({ color: 0xff0000 })
        this.previewRay = new THREE.Line(geometry, material)

        this.scene.add(this.previewRay)
    }

    onClick(_event: MouseEvent) {
        const pos = this.cursorPreview.position.clone()

        if (!this.startPoint) {
            this.startPoint = pos
            const startMesh = createPoint(pos)
            this.selectableObjects.push(startMesh)
            this.scene.add(startMesh)
            this.startPointMesh = startMesh
            return
        }

        const directionMesh = createPoint(pos)
        this.scene.add(directionMesh)
        this.selectableObjects.push(directionMesh)

        const ray = new RayObject(this.startPointMesh!, directionMesh, 50)
        this.scene.add(ray.mesh)

        if (this.previewRay) {
            this.scene.remove(this.previewRay)
            this.previewRay = null
        }

        this.startPoint = null
        this.startPointMesh = null
    }
    activate() {
        this.cursorPreview.visible = false
        this.scene.add(this.cursorPreview)

    }

    deactivate() {
        this.reset()
        this.scene.remove(this.cursorPreview)

    }

    reset() {
        if (this.previewRay) {
            this.scene.remove(this.previewRay)
            this.previewRay = null
        }

        this.startPoint = null
        this.startPointMesh = null
        this.cursorPreview.visible = false
    }
}