import * as THREE from "three"
import { BaseTool } from "./BaseTool"
import { Prism } from "../objects/Prism"
import { Pyramid } from "../objects/Pyramid"
import { Cone } from "../objects/Cone"
import { Cylinder } from "../objects/Cylinder"
import { getNearestSelectablePoint, getPointerIntersection, SELECTED_POINT_DRAG_RADIUS_PX } from "../interaction/Pointer"


type SelectionRole = "free" | "locked" | "height" | "solid"
const HELPERS_ENABLED = true
type SideCountController = {
    sideCount: number
    setSideCount: (n: number) => void
}

type UnFoldController = {
    unFoldAngle: number
    setUnFoldAngle: (angle: number) => void
    maxUnFoldAngle: number
}

export class SelectTool extends BaseTool {
    raycaster = new THREE.Raycaster()
    mouse = new THREE.Vector2()

    selectableObjects: THREE.Object3D[] = []

    selectedObject: THREE.Mesh | null = null
    originalMaterial: THREE.Material | THREE.Material[] | null = null
    selectionOutline: THREE.LineSegments | null = null
    selectedOwner: any = null
    selectedSideCountController: SideCountController | null = null
    selectedUnFoldController: UnFoldController | null = null
    sideSliderContainer: HTMLElement | null = null
    sideSlider: HTMLInputElement | null = null
    sideValue: HTMLSpanElement | null = null

    unFoldControl: HTMLElement | null = null
    unFoldSlider: HTMLInputElement | null = null
    unFoldValue: HTMLSpanElement | null = null

    deleteControl: HTMLElement | null = null
    deleteButton: HTMLButtonElement | null = null
    showButton: HTMLButtonElement | null = null
    hideButton: HTMLButtonElement | null = null
    deleteButtonListenerAttached = false
    showButtonListenerAttached = false
    hideButtonListenerAttached = false
    hiddenObjects = new Set<THREE.Object3D>()

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
        this.sideSliderContainer = document.getElementById("sideControl")
        this.sideSlider = document.getElementById("sideSlider") as HTMLInputElement
        this.sideValue = document.getElementById("sideValue") as HTMLSpanElement

        this.unFoldControl = document.getElementById("unFoldControl")
        this.unFoldSlider = document.getElementById("unFoldSlider") as HTMLInputElement
        this.unFoldValue = document.getElementById("unFoldValue") as HTMLSpanElement

        this.sideSlider?.addEventListener("input", () => {
            const value = parseInt(this.sideSlider!.value)

            this.sideValue!.textContent = value.toString()
            this.selectedSideCountController?.setSideCount(value)
            this.updateUnFoldControl(this.selectedOwner)
            this.refreshSelectionOutline()
        })

        this.unFoldSlider?.addEventListener("input", () => {
        const value = parseInt(this.unFoldSlider!.value)

            if (this.unFoldValue) {
                this.unFoldValue.textContent = value.toString()
            }

            this.selectedUnFoldController?.setUnFoldAngle(value)
        })

        this.ensureActionControls()
        this.updateActionControls()
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

        const role = this.getSelectionRole(target)

        if (role === "solid") {
            this.isDragging = false
            this.controls.enabled = true
            return
        }

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
        this.updateCursor(event)

        if (this.pointerDownPosition.distanceTo(new THREE.Vector2(event.clientX, event.clientY)) > 4) {
            this.hasMoved = true
        }

        if (!this.isDragging || !this.selectedObject) {
            this.updateHelperArrowScale()
            return
        }

        const role = this.getSelectionRole(this.selectedObject)

        if (role === "locked" || role === "solid") return

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

        if (!this.hasMoved && hit && hit === this.selectedObject && this.getSelectionRole(hit) === "free") {
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
        this.clearOwnerSelectionEffects()
        this.restoreOriginalMaterial()
        this.clearSelectionOutline()

        this.selectedObject = object
        this.selectedOwner = this.getSelectionOwner(object)

        if (this.getSelectionRole(this.selectedObject) === "solid") {
            this.selectedOwner?.onSelect?.(this.selectedObject)
            this.addSelectionOutline(this.selectedObject)
            this.updateSideCountControl(this.selectedOwner)
            this.updateUnFoldControl(this.selectedOwner)
            this.updateActionControls()
        } else if (this.selectedObject instanceof THREE.Mesh) {
            this.originalMaterial = this.selectedObject.material

            this.selectedObject.material = new THREE.MeshStandardMaterial({
                color: 0xffaa00,
            })
            this.updateSideCountControl(null)
            this.updateUnFoldControl(null)
            this.updateActionControls()
        }

        if (showHelpers) {
            this.updateHelperArrows()
        }
    }

    clearSelection() {
        this.clearHelperArrows()
        this.clearOwnerSelectionEffects()
        this.restoreOriginalMaterial()
        this.clearSelectionOutline()
        this.selectedObject = null
        this.selectedOwner = null
        this.updateSideCountControl(null)
        this.updateUnFoldControl(null)
        this.updateActionControls()
        this.verticalMove = false
        this.controls.enabled = true
    }

    private restoreOriginalMaterial() {
        if (this.selectedObject instanceof THREE.Mesh && this.originalMaterial) {
            this.selectedObject.material = this.originalMaterial
            this.originalMaterial = null
        }
    }

    private getSelectionRole(object: THREE.Object3D): SelectionRole {
        if (object.userData.selectableType === "solid") {
            return "solid"
        }

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

    private getSelectionOwner(object: THREE.Object3D) {
        return object.userData.owner ?? null
    }

    private clearOwnerSelectionEffects() {
        this.selectedOwner?.onDeselect?.()
        this.selectedOwner = null
    }

    private updateSideCountControl(owner: any) {
        const controller = this.getSideCountController(owner)

        this.selectedSideCountController = controller

        if (!this.sideSliderContainer || !this.sideSlider || !this.sideValue) return

        this.sideSliderContainer.style.display = "block"

        if (!controller) {
            this.sideSlider.disabled = true
            this.sideSliderContainer.classList.remove("active")
            this.sideSliderContainer.classList.add("passive")
            return
        }

        const value = controller.sideCount.toString()

        this.sideSlider.value = value
        this.sideValue.textContent = value

        this.sideSlider.disabled = false
        this.sideSliderContainer.classList.add("active")
        this.sideSliderContainer.classList.remove("passive")
    }
    private updateUnFoldControl(owner: any) {
        if (!this.unFoldControl || !this.unFoldSlider) return

        const controller = this.getUnFoldController(owner)
        const active = controller !== null

        this.selectedUnFoldController = controller

        this.unFoldControl.style.display = "block"
        this.unFoldControl.classList.toggle("active", active)
        this.unFoldControl.classList.toggle("passive", !active)

        const value = controller?.unFoldAngle ?? 0
        this.unFoldSlider.max = (controller?.maxUnFoldAngle ?? 90).toString()
        this.unFoldSlider.value = value.toString()

        if (this.unFoldValue) {
            this.unFoldValue.textContent = value.toString()
        }

        this.unFoldSlider.disabled = !active
    }

    private updateActionControls() {
        this.ensureActionControls()

        if (!this.deleteControl || !this.deleteButton || !this.showButton || !this.hideButton) return

        const canDelete = this.canDeleteSelected()
        const canHide = this.canHideSelected()
        const canShow = this.hiddenObjects.size > 0

        this.deleteControl.style.display = "flex"
        this.deleteButton.disabled = !canDelete
        this.hideButton.disabled = !canHide
        this.showButton.disabled = !canShow

        this.deleteButton.classList.toggle("active", canDelete)
        this.deleteButton.classList.toggle("passive", !canDelete)
        this.hideButton.classList.toggle("active", canHide)
        this.hideButton.classList.toggle("passive", !canHide)
        this.showButton.classList.toggle("active", canShow)
        this.showButton.classList.toggle("passive", !canShow)

        this.deleteButton.title = canDelete
            ? "Sil"
            : "Silinecek nesne seçilmedi"

        this.hideButton.title = canHide
            ? "Gizle"
            : "Gizlenecek nesne seçilmedi"

        this.showButton.title = canShow
            ? "Tümünü Göster"
            : "Gizli nesne yok"
    }
    private ensureActionControls() {
        this.deleteControl ??= document.getElementById("rightActionToolbar")
        this.deleteButton ??= document.getElementById("deleteButton") as HTMLButtonElement | null
        this.showButton ??= document.getElementById("showButton") as HTMLButtonElement | null
        this.hideButton ??= document.getElementById("hideButton") as HTMLButtonElement | null

        if (!this.deleteButton || this.deleteButtonListenerAttached) return

        this.deleteButton.addEventListener("click", () => {
            this.deleteSelected()
        })
        this.deleteButtonListenerAttached = true

        if (this.showButton && !this.showButtonListenerAttached) {
            this.showButton.addEventListener("click", () => {
                this.showHiddenObjects()
            })
            this.showButtonListenerAttached = true
        }

        if (this.hideButton && !this.hideButtonListenerAttached) {
            this.hideButton.addEventListener("click", () => {
                this.hideSelected()
            })
            this.hideButtonListenerAttached = true
        }
    }

    private canDeleteSelected() {
        if (!this.selectedObject) return false

        if (this.getSelectionRole(this.selectedObject) === "solid") {
            return true
        }

        if (!this.selectedObject.userData.pointRole) {
            return false
        }

        if (
            this.selectedObject.userData.owner instanceof Prism ||
            this.selectedObject.userData.owner instanceof Pyramid ||
            this.selectedObject.userData.owner instanceof Cone ||
            this.selectedObject.userData.owner instanceof Cylinder
        ) {
            return false
        }

        return (this.selectedObject.userData.dependents?.length ?? 0) === 0
    }

    private canHideSelected() {
        return this.selectedObject !== null && this.selectedObject.visible
    }

    private hideSelected() {
        if (!this.selectedObject || !this.canHideSelected()) return

        const selected = this.selectedObject
        const owner = this.selectedOwner ?? this.getVisibilityOwner(selected)
        const objectsToHide = this.getObjectsForVisibilityAction(selected, owner)

        this.clearSelection()

        objectsToHide.forEach((object) => {
            object.visible = false
            this.hiddenObjects.add(object)
        })

        this.updateActionControls()
    }

    private showHiddenObjects() {
        this.hiddenObjects.forEach((object) => {
            object.visible = true
        })

        this.hiddenObjects.clear()
        this.updateActionControls()
    }

    private deleteSelected() {
        if (!this.selectedObject || !this.canDeleteSelected()) return

        const selected = this.selectedObject
        const owner = this.selectedOwner

        this.clearSelection()

        if (selected.userData.selectableType === "solid" && owner) {
            this.deleteOwner(owner)
            return
        }

        if (selected.userData.pointRole) {
            this.removeSelectableObject(selected)
            this.scene.remove(selected)
            this.disposeObject(selected)
        }
    }

    private deleteOwner(owner: any) {
        owner.onBeforeDelete?.()
        this.removeOwnerFromDependents(owner)

        const removedObjects = new Set<THREE.Object3D>()
        const candidatePoints = new Set<THREE.Object3D>()

        const ownedObjects = typeof owner.getOwnedObjectsForDeletion === "function"
            ? owner.getOwnedObjectsForDeletion()
            : Object.values(owner)

        ownedObjects.forEach((value: unknown) => {
            this.collectOwnedObjects(value, removedObjects, candidatePoints)
        })

        removedObjects.forEach((object) => {
            this.removeSelectableObject(object)
            this.scene.remove(object)
            if (object.parent) {
                object.parent.remove(object)
            }
            this.disposeObject(object)
        })

        candidatePoints.forEach((point) => {
            if ((point.userData.dependents?.length ?? 0) > 0) return

            this.removeSelectableObject(point)
            this.scene.remove(point)
            if (point.parent) {
                point.parent.remove(point)
            }
            this.disposeObject(point)
        })
    }

    private getObjectsForVisibilityAction(selected: THREE.Object3D, owner: any) {
        if (owner && typeof owner.getOwnedObjectsForDeletion === "function") {
            return owner.getOwnedObjectsForDeletion() as THREE.Object3D[]
        }

        return [selected]
    }

    private getVisibilityOwner(object: THREE.Object3D) {
        if (object.userData.owner) {
            return object.userData.owner
        }

        const dependents = object.userData.dependents

        if (!Array.isArray(dependents)) return null

        return dependents.find(
            (dependent: any) => typeof dependent?.getOwnedObjectsForDeletion === "function"
        ) ?? null
    }

    private collectOwnedObjects(
        value: unknown,
        removedObjects: Set<THREE.Object3D>,
        candidatePoints: Set<THREE.Object3D>
    ) {
        if (value instanceof THREE.Object3D) {
            if (value.userData.pointRole) {
                candidatePoints.add(value)
            } else {
                removedObjects.add(value)
            }
            return
        }

        if (Array.isArray(value)) {
            value.forEach((item) => this.collectOwnedObjects(
                item,
                removedObjects,
                candidatePoints
            ))
        }
    }

    private removeOwnerFromDependents(owner: any) {
        this.selectableObjects.forEach((object) => {
            const dependents = object.userData.dependents

            if (!Array.isArray(dependents)) return

            object.userData.dependents = dependents.filter(
                (dependent: any) => dependent !== owner
            )
        })
    }

    private removeSelectableObject(object: THREE.Object3D) {
        for (let i = this.selectableObjects.length - 1; i >= 0; i--) {
            if (this.selectableObjects[i] === object) {
                this.selectableObjects.splice(i, 1)
            }
        }
    }

    private disposeObject(object: THREE.Object3D) {
        object.traverse((child) => {
            if (!(child instanceof THREE.Mesh || child instanceof THREE.Line || child instanceof THREE.LineSegments)) {
                return
            }

            child.geometry.dispose()

            if (Array.isArray(child.material)) {
                child.material.forEach((material) => material.dispose())
            } else {
                child.material.dispose()
            }
        })
    }

    private getSideCountController(owner: any): SideCountController | null {
        if (
            owner &&
            typeof owner.sideCount === "number" &&
            typeof owner.setSideCount === "function"
        ) {
            return owner as SideCountController
        }

        return null
    }

    private getUnFoldController(owner: any): UnFoldController | null {
        if (
            (owner instanceof Prism || owner instanceof Pyramid || owner instanceof Cone || owner instanceof Cylinder) &&
            typeof owner.unFoldAngle === "number" &&
            typeof owner.setUnFoldAngle === "function"
        ) {
            return {
                unFoldAngle: owner.unFoldAngle,
                setUnFoldAngle: (angle: number) => owner.setUnFoldAngle(angle),
                maxUnFoldAngle:
                    owner instanceof Pyramid || owner instanceof Cone
                        ? owner.getMaxUnFoldAngle()
                        : 90,
            }
        }

        return null
    }

    private pickObject(event: PointerEvent | MouseEvent): THREE.Mesh | null {
        return (
            getNearestSelectablePoint(event, this.camera, this.selectableObjects) ??
            this.pickSolid(event)
        )
    }

    private pickSolid(event: PointerEvent | MouseEvent): THREE.Mesh | null {
        const solidMeshes = this.selectableObjects.filter((object): object is THREE.Mesh =>
            object instanceof THREE.Mesh &&
            object.visible &&
            object.userData.selectableType === "solid"
        )

        if (solidMeshes.length === 0) return null

        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

        this.raycaster.setFromCamera(this.mouse, this.camera)

        return this.raycaster.intersectObjects(solidMeshes, false)[0]?.object as THREE.Mesh ?? null
    }

    private updateCursor(event: PointerEvent | MouseEvent) {
        document.body.style.cursor = this.pickObject(event) ? "pointer" : "default"
    }

    private addSelectionOutline(object: THREE.Mesh) {
        this.clearSelectionOutline()

        if (object.userData.selectionOutline === "none") {
            return
        }

        if (object.userData.selectionOutline === "box") {
            this.selectionOutline = new THREE.BoxHelper(object, 0xffaa00)
            this.selectionOutline.renderOrder = 999
            this.scene.add(this.selectionOutline)
            return
        }

        const geometry = new THREE.EdgesGeometry(object.geometry, 15)
        const material = new THREE.LineBasicMaterial({
            color: 0xffaa00,
            depthTest: false,
        })

        this.selectionOutline = new THREE.LineSegments(geometry, material)
        this.selectionOutline.renderOrder = 999
        object.add(this.selectionOutline)
    }

    private clearSelectionOutline() {
        if (!this.selectionOutline) return

        if (this.selectionOutline.parent) {
            this.selectionOutline.parent.remove(this.selectionOutline)
        }

        this.selectionOutline.geometry.dispose()

        if (Array.isArray(this.selectionOutline.material)) {
            this.selectionOutline.material.forEach((material) => material.dispose())
        } else {
            this.selectionOutline.material.dispose()
        }

        this.selectionOutline = null
    }

    private refreshSelectionOutline() {
        if (
            !this.selectedObject ||
            this.getSelectionRole(this.selectedObject) !== "solid"
        ) {
            return
        }

        this.clearSelectionOutline()
        this.addSelectionOutline(this.selectedObject)
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

        const role = this.getSelectionRole(this.selectedObject)

        if (role === "locked" || role === "solid") {
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
