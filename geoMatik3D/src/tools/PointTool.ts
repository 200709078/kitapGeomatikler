import * as THREE from "three"
import { BaseTool } from "./BaseTool"
import { getMouseIntersection } from "../interaction/Raycaster"
import { createPoint } from "../objects/Point"

export class PointTool extends BaseTool {
    points: THREE.Mesh[] = []
    preview: THREE.Mesh
    selectableObjects: THREE.Object3D[]

    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, selectableObjects: THREE.Object3D[]) {
        super(scene, camera)
        this.selectableObjects = selectableObjects
        this.points = []
        const geo = new THREE.SphereGeometry(0.1, 16, 16)
        const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 })

        this.preview = new THREE.Mesh(geo, mat)
    }
    onMouseMove(event: MouseEvent) {
        const pos = getMouseIntersection(event, this.camera)
        this.preview.position.copy(pos)
        this.preview.visible = true
    }

    onClick(_event: MouseEvent) {
        const point = createPoint(this.preview.position.clone())
        this.scene.add(point)
        this.points.push(point)
        this.selectableObjects.push(point)
    }
    activate() {
        this.preview.visible = false

        if (!this.preview.parent) {
            this.scene.add(this.preview)
        }
    }

    deactivate() {
        this.preview.visible = false

        if (this.preview.parent) {
            this.scene.remove(this.preview)
        }
    }

    reset() {
        this.preview.visible = false
    }
}