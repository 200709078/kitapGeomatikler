import * as THREE from "three"
export class BaseTool {
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera

    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
        this.scene = scene
        this.camera = camera
    }
    onMouseMove(_event: MouseEvent) { }
    onClick(_event: MouseEvent) { }
    onMouseDown(_event: MouseEvent) { }
    onMouseUp(_event: MouseEvent) { }
    onKeyDown(_event: KeyboardEvent) { }
    reset() { }
    activate() { }
    deactivate() { }
}