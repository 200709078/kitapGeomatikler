import * as THREE from "three"

export class RayObject {
    startPoint: THREE.Mesh
    directionPoint: THREE.Mesh
    mesh: THREE.Mesh
    length: number

    constructor(startPoint: THREE.Mesh, directionPoint: THREE.Mesh, length = 50) {
        this.startPoint = startPoint
        this.directionPoint = directionPoint
        this.length = length

        const geometry = new THREE.CylinderGeometry(0.03, 0.03, 1, 16)
        const material = new THREE.MeshStandardMaterial({ color: 0x0066ff })

        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true

        this.startPoint.userData.rays ??= []
        this.directionPoint.userData.rays ??= []

        this.startPoint.userData.rays.push(this)
        this.directionPoint.userData.rays.push(this)

        this.update()
    }

    update() {
        const start = this.startPoint.position
        const directionTarget = this.directionPoint.position

        const direction = new THREE.Vector3()
            .subVectors(directionTarget, start)
            .normalize()

        const end = new THREE.Vector3()
            .copy(start)
            .add(direction.multiplyScalar(this.length))

        const midpoint = new THREE.Vector3()
            .addVectors(start, end)
            .multiplyScalar(0.5)

        this.mesh.position.copy(midpoint)
        this.mesh.scale.set(1, this.length, 1)

        const quaternion = new THREE.Quaternion()
        quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            new THREE.Vector3().subVectors(end, start).normalize()
        )

        this.mesh.quaternion.copy(quaternion)
    }
}