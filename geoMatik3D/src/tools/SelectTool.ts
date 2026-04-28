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

        const dragY = this.selectedObject ? this.selectedObject.position.y : 0

        const plane = new THREE.Plane(
            new THREE.Vector3(0, 1, 0),
            -dragY
        )

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

        if (this.selectedObject.userData.lockMouseDrag) return

        event.preventDefault()
        event.stopPropagation()

        const pos = this.getMousePositionOnPlane(event)
        this.selectedObject.position.copy(pos)

        this.syncPrismPairY(this.selectedObject)
        this.updateDependents(this.selectedObject)
    }



    /*  onMouseMove(event: MouseEvent) {
         if (!this.isDragging || !this.selectedObject) return
 
         event.preventDefault()
         event.stopPropagation()
 
         const pos = this.getMousePositionOnPlane(event)
         this.selectedObject.position.copy(pos)
 
         this.syncPrismPairY(this.selectedObject)
         this.updateDependents(this.selectedObject)
     } */

    onMouseUp(event: MouseEvent) {
        if (this.isDragging) {
            event.preventDefault()
            event.stopPropagation()
        }

        this.isDragging = false
        this.controls.enabled = true
    }

    onWheel(event: WheelEvent) {
        if (!event.shiftKey) return
        if (!this.selectedObject) return

        event.preventDefault()
        event.stopPropagation()

        const delta = event.deltaY < 0 ? 0.25 : -0.25

        const normalWheelController =
            this.selectedObject.userData.normalWheelController

        if (normalWheelController) {
            normalWheelController.moveAlongNormal(delta)
            return
        }

        this.controls.enabled = false

        this.selectedObject.position.y += delta

        this.syncPrismPairY(this.selectedObject)
        this.updateDependents(this.selectedObject)

        this.controls.enabled = true
    }



    /*    onWheel(event: WheelEvent) {
           if (!event.shiftKey) return
           if (!this.selectedObject) return
   
           event.preventDefault()
           event.stopPropagation()
   
           this.controls.enabled = false
   
           const delta = event.deltaY < 0 ? 0.25 : -0.25
           this.selectedObject.position.y += delta
   
           this.syncPrismPairY(this.selectedObject)
           this.updateDependents(this.selectedObject)
   
           this.controls.enabled = true
       } */

    syncPrismPairY(object: THREE.Object3D) {
        const prismPair = object.userData.prismPair as THREE.Object3D | undefined

        if (!prismPair) return

        prismPair.position.y = object.position.y
        this.updateDependents(prismPair)
    }

    updateDependents(object: THREE.Object3D) {
        const dependents = object.userData.dependents

        if (!dependents) return

        dependents.forEach((dependent: any) => {
            dependent.update()
        })
    }
}