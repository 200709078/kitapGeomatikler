import * as THREE from "three"
import { BaseTool } from "./BaseTool"

export class SelectTool extends BaseTool {
    raycaster = new THREE.Raycaster()
    mouse = new THREE.Vector2()
    selectableObjects: THREE.Object3D[] = []
    selectedObject: THREE.Object3D | null = null
    originalMaterial: THREE.Material | THREE.Material[] | null = null
    isDragging = false

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
    getMousePositionOnPlane(event: MouseEvent) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

        this.raycaster.setFromCamera(this.mouse, this.camera)

        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
        const point = new THREE.Vector3()

        this.raycaster.ray.intersectPlane(plane, point)

        return point
    }

    onClick(event: MouseEvent) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

        if (this.selectedObject instanceof THREE.Mesh && this.originalMaterial) {
            this.selectedObject.material = this.originalMaterial
            this.originalMaterial = null
        }

        this.raycaster.setFromCamera(this.mouse, this.camera)
        const intersects = this.raycaster.intersectObjects(this.selectableObjects, false)

        if (intersects.length === 0) {
            this.selectedObject = null
            return
        }

        this.selectedObject = intersects[0].object

        if (this.selectedObject instanceof THREE.Mesh) {
            this.originalMaterial = this.selectedObject.material
            this.selectedObject.material = new THREE.MeshStandardMaterial({
                color: 0xffaa00
            })
        }
    }
    onMouseDown(event: MouseEvent) {
        this.onClick(event)

        if (this.selectedObject) {
            event.preventDefault()
            event.stopPropagation()

            this.isDragging = true
            this.controls.enabled = false
        }
    }

    onMouseMove(event: MouseEvent) {
        if (!this.isDragging || !this.selectedObject) return

        event.preventDefault()
        event.stopPropagation()

        const pos = this.getMousePositionOnPlane(event)
        this.selectedObject.position.copy(pos)

        const lineSegments = this.selectedObject.userData.lineSegments
        if (lineSegments) {
            lineSegments.forEach((lineSegment: any) => {
                lineSegment.update()
            })
        }

        const rays = this.selectedObject.userData.rays
        if (rays) {
            rays.forEach((ray: any) => {
                ray.update()
            })
        }

        const angles = this.selectedObject.userData.angles

        if (angles) {
            angles.forEach((angle: any) => {
                angle.update()
            })
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

}