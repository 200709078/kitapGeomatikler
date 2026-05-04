import * as THREE from "three"
import { BaseTool } from "./BaseTool"
import { getNearestSelectablePoint, getPointerIntersection, SELECTED_POINT_DRAG_RADIUS_PX, updatePointCursor } from "../interaction/Pointer"

type PointRole = "free" | "locked" | "height"
const HELPERS_ENABLED = true

export class SelectTool extends BaseTool {
    raycaster = new THREE.Raycaster()
    mouse = new THREE.Vector2()

    selectableObjects: THREE.Object3D[] = []

    selectedObject: THREE.Mesh | null = null
    originalMaterial: THREE.Material | THREE.Material[] | null = null

    isDragging = false
    verticalMove = false
    lastMouseY = 0
    pointerDownPosition = new THREE.Vector2()
    dragOffset = new THREE.Vector3()
    hasMoved = false
    activePointerType = "mouse"
    lastTapObject: THREE.Mesh | null = null
    lastTapTime = 0

    helperArrows: THREE.Group[] = []

    controls: any

    constructor(
        scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        controls: any
    ) {
        super(scene, camera)
        this.controls = controls
    }

    setSelectableObjects(objects: THREE.Object3D[]) {
        this.selectableObjects = objects
    }

    shouldHandleBeforeOrbitControls(event: PointerEvent) {
        return this.pickObject(event) !== null || this.shouldStartSelectedPointDrag(event)
    }

    deactivate() {
        this.isDragging = false
        this.controls.enabled = true
        this.clearSelection()
        document.body.style.cursor = "default"
    }

    onPointerDown(event: PointerEvent) {
        this.activePointerType = event.pointerType || "mouse"
        const hit = this.pickObject(event)
        const dragSelectedPoint = !hit && this.shouldStartSelectedPointDrag(event)
        this.pointerDownPosition.set(event.clientX, event.clientY)
        this.hasMoved = false

        if (!hit && !dragSelectedPoint) {
            this.clearSelection()
            document.body.style.cursor = "default"
            this.controls.enabled = true
            return
        }

        const target = hit ?? this.selectedObject!

        this.selectObject(target)
        this.updateHelperArrows()

        const role = this.getPointRole(target)

        if (role === "locked") {
            this.isDragging = false
            return
        }

        this.isDragging = true
        this.lastMouseY = event.clientY
        this.dragOffset.set(0, 0, 0)

        if (role === "free" && !this.verticalMove) {
            const pointerPosition = this.getPointerPositionOnPlane(event)
            this.dragOffset.copy(target.position).sub(pointerPosition)
        }

    }

    onPointerMove(event: PointerEvent) {
        updatePointCursor(event, this.camera, this.selectableObjects)

        if (this.pointerDownPosition.distanceTo(new THREE.Vector2(event.clientX, event.clientY)) > 4) {
            this.hasMoved = true
        }

        if (!this.isDragging || !this.selectedObject) {
            this.updateHelperArrowScale()
            return
        }

        const role = this.getPointRole(this.selectedObject)

        if (role === "locked") return

        if (role === "height") {
            const dy = event.clientY - this.lastMouseY
            this.lastMouseY = event.clientY

            const controller = this.selectedObject.userData.normalWheelController

            if (controller) {
                controller.moveAlongNormal(-dy * 0.02)
            }

            this.updateHelperArrows()
            return
        }

        if (role === "free") {
            if (this.verticalMove) {
                const dy = event.clientY - this.lastMouseY
                this.lastMouseY = event.clientY

                this.selectedObject.position.y -= dy * 0.02

                this.syncPrismPairY(this.selectedObject)
                this.updateDependents(this.selectedObject)
                this.updateHelperArrows()
                return
            }

            const pos = this.getPointerPositionOnPlane(event)
            this.selectedObject.position.copy(pos.add(this.dragOffset))

            this.syncPrismPairY(this.selectedObject)
            this.updateDependents(this.selectedObject)
            this.updateHelperArrows()
        }
    }

    onPointerUp(event: PointerEvent) {
        const hit = this.pickObject(event)

        if (!this.hasMoved && hit && hit === this.selectedObject && this.getPointRole(hit) === "free") {
            const now = performance.now()

            if (this.lastTapObject === hit && now - this.lastTapTime < 350) {
                this.verticalMove = !this.verticalMove
                this.updateHelperArrows()
                this.lastTapObject = null
                this.lastTapTime = 0
            } else {
                this.lastTapObject = hit
                this.lastTapTime = now
            }
        }

        this.isDragging = false
        this.controls.enabled = true
        this.updateHelperArrowScale()
    }

    onMouseDown(event: MouseEvent) { this.onPointerDown(event as PointerEvent) }
    onMouseMove(event: MouseEvent) { this.onPointerMove(event as PointerEvent) }
    onMouseUp(event: MouseEvent) { this.onPointerUp(event as PointerEvent) }

    selectPoint(object: THREE.Mesh) {
        this.selectObject(object)
    }

    selectPointWithoutHelpers(object: THREE.Mesh) {
        this.selectObject(object)
    }

    private selectObject(object: THREE.Mesh, showHelpers = true) {
        if (this.selectedObject === object) {
            if (showHelpers) {
                this.updateHelperArrows()
            } else {
                this.clearHelperArrows()
            }
            return
        }

        this.clearHelperArrows()
        this.restoreOriginalMaterial()

        this.selectedObject = object

        if (this.selectedObject instanceof THREE.Mesh) {
            this.originalMaterial = this.selectedObject.material

            this.selectedObject.material = new THREE.MeshStandardMaterial({
                color: 0xffaa00,
            })
        }

        if (showHelpers) {
            this.updateHelperArrows()
        }
    }

    clearSelection() {
        this.clearHelperArrows()
        this.restoreOriginalMaterial()
        this.selectedObject = null
        this.verticalMove = false
        this.controls.enabled = true
    }

    private restoreOriginalMaterial() {
        if (this.selectedObject instanceof THREE.Mesh && this.originalMaterial) {
            this.selectedObject.material = this.originalMaterial
            this.originalMaterial = null
        }
    }

    private getPointRole(object: THREE.Object3D): PointRole {
        return (
            object.userData.pointRole ??
            (
                object.userData.normalWheelController
                    ? "height"
                    : object.userData.lockMouseDrag
                        ? "locked"
                        : "free"
            )
        )
    }

    private pickObject(event: PointerEvent | MouseEvent): THREE.Mesh | null {
        return getNearestSelectablePoint(event, this.camera, this.selectableObjects)
    }

    private getPointerPositionOnPlane(event: PointerEvent | MouseEvent) {
        const y = this.selectedObject ? this.selectedObject.position.y : 0

        return getPointerIntersection(event, this.camera, undefined, y)
    }

    private syncPrismPairY(object: THREE.Object3D) {
        const prismPair = object.userData.prismPair as THREE.Object3D | undefined

        if (!prismPair) return

        prismPair.position.y = object.position.y
        this.updateDependents(prismPair)
    }

    private updateDependents(object: THREE.Object3D) {
        object.userData.dependents?.forEach((dependent: any) => {
            dependent.update?.()
        })
    }

    private updateHelperArrows() {
        if (!HELPERS_ENABLED) {
            this.clearHelperArrows()
            return
        }

        this.clearHelperArrows()

        if (!this.selectedObject) {
            return
        }

        const role = this.getPointRole(this.selectedObject)

        if (role === "locked") {
            return
        }

        if (role === "height") {
            const controller = this.selectedObject.userData.normalWheelController

            let direction = new THREE.Vector3(0, 1, 0)

            if (controller?.getHeightDirection) {
                direction = controller.getHeightDirection()
            }

            this.addDoubleHelperArrow(direction, 0x800080)
            this.updateHelperArrowScale()
            return
        }

        if (role === "free") {
            if (this.verticalMove) {
                this.addDoubleHelperArrow(new THREE.Vector3(0, 1, 0), 0xffaa00)
                this.updateHelperArrowScale()
                return
            }

            this.addDoubleHelperArrow(new THREE.Vector3(1, 0, 0), 0xffaa00)
            this.addDoubleHelperArrow(new THREE.Vector3(0, 0, 1), 0xffaa00)
            this.updateHelperArrowScale()
        }
    }

    private addDoubleHelperArrow(direction: THREE.Vector3, color: number) {
        const dir = direction.clone().normalize()
        const positiveArrow = this.createHelperArrow(dir, color)
        const negativeArrow = this.createHelperArrow(
            dir.clone().multiplyScalar(-1),
            color
        )

        this.helperArrows.push(positiveArrow, negativeArrow)

        this.selectedObject!.add(positiveArrow)
        this.selectedObject!.add(negativeArrow)
    }

    private createHelperArrow(direction: THREE.Vector3, color: number) {
        const dir = direction.clone().normalize()

        const group = new THREE.Group()

        const offset = 0.6
        const shaftLength = 0.66
        const headLength = 0.36

        const shaftRadius = 0.105
        const headRadius = 0.14

        const material = new THREE.MeshStandardMaterial({
            color,
        })

        const shaftGeometry = new THREE.CylinderGeometry(
            shaftRadius,
            shaftRadius,
            shaftLength,
            12
        )

        const shaft = new THREE.Mesh(shaftGeometry, material)

        const headGeometry = new THREE.ConeGeometry(
            headRadius,
            headLength,
            16
        )

        const head = new THREE.Mesh(headGeometry, material)

        const quaternion = new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            dir
        )

        shaft.quaternion.copy(quaternion)
        head.quaternion.copy(quaternion)

        shaft.position.copy(
            dir.clone().multiplyScalar(offset + shaftLength / 2)
        )

        head.position.copy(
            dir.clone().multiplyScalar(offset + shaftLength + headLength / 2)
        )

        group.add(shaft)
        group.add(head)

        return group
    }

    private updateHelperArrowScale() {
        this.helperArrows.forEach((arrow) => {
            arrow.scale.setScalar(1)
        })
    }

    private clearHelperArrows() {
        this.helperArrows.forEach((arrow) => {
            if (arrow.parent) {
                arrow.parent.remove(arrow)
            }

            arrow.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.geometry.dispose()

                    if (Array.isArray(child.material)) {
                        child.material.forEach((m) => m.dispose())
                    } else {
                        child.material.dispose()
                    }
                }
            })
        })

        this.helperArrows = []
    }

    private shouldStartSelectedPointDrag(event: PointerEvent | MouseEvent) {
        if (!this.selectedObject || this.helperArrows.length === 0) return false

        return this.getScreenDistanceToSelectedPoint(event) <= SELECTED_POINT_DRAG_RADIUS_PX
    }

    private getScreenDistanceToSelectedPoint(event: PointerEvent | MouseEvent) {
        if (!this.selectedObject) return Infinity

        const projected = new THREE.Vector3()
        this.selectedObject.getWorldPosition(projected)
        projected.project(this.camera)

        const x = (projected.x * 0.5 + 0.5) * window.innerWidth
        const y = (-projected.y * 0.5 + 0.5) * window.innerHeight

        return Math.hypot(event.clientX - x, event.clientY - y)
    }
}
