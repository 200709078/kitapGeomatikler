import * as THREE from "three"
import { BaseTool } from "./BaseTool"
import { createPoint } from "../objects/Point"
import { getNearestSelectablePoint, getPointerIntersection, getPointerPointSize, PREVIEW_POINT_SIZE, shouldShowPointerPreview, updatePointCursor } from "../interaction/Pointer"

export class PointTool extends BaseTool {
    points: THREE.Mesh[] = []
    preview: THREE.Mesh
    selectableObjects: THREE.Object3D[]

    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, selectableObjects: THREE.Object3D[]) {
        super(scene, camera)
        this.selectableObjects = selectableObjects
        this.points = []
        const geo = new THREE.SphereGeometry(PREVIEW_POINT_SIZE, 16, 16)
        const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 })

        this.preview = new THREE.Mesh(geo, mat)
    }
    onPointerMove(event: PointerEvent) {
        updatePointCursor(event, this.camera, this.selectableObjects)

        if (!shouldShowPointerPreview(event)) {
            this.preview.visible = false
            return
        }

        this.preview.position.copy(getPointerIntersection(event, this.camera))
        this.preview.visible = true
    }

    onPointerDown(_event: PointerEvent) {
        const existingPoint = getNearestSelectablePoint(
            _event,
            this.camera,
            this.selectableObjects
        )

        if (existingPoint) {
            this.selectPoint(existingPoint)
            this.complete({ clearSelection: false })
            return
        }
        const point = createPoint(
            getPointerIntersection(_event, this.camera),
            getPointerPointSize(_event)
        )
        this.scene.add(point)
        this.points.push(point)
        this.selectableObjects.push(point)
        this.recordCreation("Nokta oluştur", [point])
        this.complete()
    }

    onClick(event: MouseEvent) { this.onPointerDown(event as PointerEvent) }
    onMouseMove(_event: MouseEvent) { }
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
