import * as THREE from "three"
import { BaseTool } from "./BaseTool"

type PointRole = "free" | "locked" | "height"

export class SelectTool extends BaseTool {
    raycaster = new THREE.Raycaster()
    mouse = new THREE.Vector2()

    selectableObjects: THREE.Object3D[] = []

    selectedObject: THREE.Mesh | null = null
    originalMaterial: THREE.Material | THREE.Material[] | null = null

    isDragging = false
    verticalMove = false
    lastMouseY = 0

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

    onMouseDown(event: MouseEvent) {
        const hit = this.pickObject(event)

        if (!hit) {
            this.clearSelection()
            return
        }

        this.selectObject(hit)

        this.isDragging = true
        this.controls.enabled = false
        this.lastMouseY = event.clientY

        event.preventDefault()
        event.stopPropagation()
    }

    onMouseMove(event: MouseEvent) {
        if (!this.isDragging || !this.selectedObject) return

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

            const pos = this.getMousePositionOnPlane(event)
            this.selectedObject.position.copy(pos)

            this.syncPrismPairY(this.selectedObject)
            this.updateDependents(this.selectedObject)
            this.updateHelperArrows()
        }
    }

    onMouseUp(event: MouseEvent) {
        if (this.isDragging) {
            event.preventDefault()
            event.stopPropagation()
        }

        this.isDragging = false
        this.controls.enabled = true
    }

    onDoubleClick(event: MouseEvent) {
        const hit = this.pickObject(event)

        if (!hit) return

        const role = this.getPointRole(hit)

        if (role !== "free") return

        this.selectObject(hit)
        this.verticalMove = !this.verticalMove
        this.updateHelperArrows()

        event.preventDefault()
        event.stopPropagation()
    }

    private selectObject(object: THREE.Mesh) {
        if (this.selectedObject === object) {
            this.updateHelperArrows()
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

        this.updateHelperArrows()
    }

    private clearSelection() {
        this.clearHelperArrows()
        this.restoreOriginalMaterial()
        this.selectedObject = null
        this.verticalMove = false
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

    private pickObject(event: MouseEvent): THREE.Mesh | null {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

        this.raycaster.setFromCamera(this.mouse, this.camera)

        const intersects = this.raycaster.intersectObjects(
            this.selectableObjects,
            false
        )

        if (intersects.length === 0) return null

        const object = intersects[0].object

        if (object instanceof THREE.Mesh) {
            return object
        }

        return null
    }

    private getMousePositionOnPlane(event: MouseEvent) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

        this.raycaster.setFromCamera(this.mouse, this.camera)

        const y = this.selectedObject ? this.selectedObject.position.y : 0

        const plane = new THREE.Plane(
            new THREE.Vector3(0, 1, 0),
            -y
        )

        const point = new THREE.Vector3()
        this.raycaster.ray.intersectPlane(plane, point)

        return point
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
        this.clearHelperArrows()

        if (!this.selectedObject) return

        const role = this.getPointRole(this.selectedObject)

        if (role === "locked") return

        if (role === "height") {
            const controller = this.selectedObject.userData.normalWheelController

            let direction = new THREE.Vector3(0, 1, 0)

            if (controller?.getHeightDirection) {
                direction = controller.getHeightDirection()
            }

            this.addDoubleHelperArrow(direction, 0x800080)
            return
        }

        if (role === "free") {
            if (this.verticalMove) {
                this.addDoubleHelperArrow(new THREE.Vector3(0, 1, 0), 0xffaa00)
                return
            }

            this.addDoubleHelperArrow(new THREE.Vector3(1, 0, 0), 0xffaa00)
            this.addDoubleHelperArrow(new THREE.Vector3(0, 0, 1), 0xffaa00)
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

        const offset = 0.18
        const shaftLength = 0.22
        const headLength = 0.12

        const shaftRadius = 0.035
        const headRadius = 0.07

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
}