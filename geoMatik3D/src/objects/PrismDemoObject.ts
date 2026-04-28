import * as THREE from "three"
import { createPoint } from "./Point"
export class PrismDemoObject {
    pointA: THREE.Mesh
    pointB: THREE.Mesh
    pointC: THREE.Mesh
    pointAprime: THREE.Mesh

    mesh: THREE.Mesh
    baseLine: THREE.LineLoop
    topLine: THREE.LineLoop
    heightLine: THREE.Line

    sideCount = 4
    height = 1

    constructor(
        scene: THREE.Scene,
        selectableObjects: THREE.Object3D[],
        A: THREE.Vector3,
        B: THREE.Vector3,
        sideCount = 4
    ) {
        this.sideCount = sideCount

        const pointAObject = createPoint(A)
        const pointBObject = createPoint(B)
        const pointCObject = createPoint(this.createInitialC(A, B))

        this.pointA = pointAObject
        this.pointB = pointBObject
        this.pointC = pointCObject

        this.height = A.distanceTo(B)

        this.pointAprime = this.createPurplePoint(A.clone())

        scene.add(this.pointA)
        scene.add(this.pointB)
        scene.add(this.pointC)
        scene.add(this.pointAprime)

        selectableObjects.push(this.pointA)
        selectableObjects.push(this.pointB)
        selectableObjects.push(this.pointC)
        selectableObjects.push(this.pointAprime)

        this.mesh = new THREE.Mesh(
            new THREE.BufferGeometry(),
            new THREE.MeshStandardMaterial({
                color: 0xd2a679,
                transparent: true,
                opacity: 0.55,
                side: THREE.DoubleSide,
            })
        )

        this.baseLine = new THREE.LineLoop(
            new THREE.BufferGeometry(),
            new THREE.LineBasicMaterial({ color: 0x000000 })
        )

        this.topLine = new THREE.LineLoop(
            new THREE.BufferGeometry(),
            new THREE.LineBasicMaterial({ color: 0x000000 })
        )

        this.heightLine = new THREE.Line(
            new THREE.BufferGeometry(),
            new THREE.LineDashedMaterial({
                color: 0x800080,
                dashSize: 0.15,
                gapSize: 0.1,
            })
        )

        scene.add(this.mesh)
        scene.add(this.baseLine)
        scene.add(this.topLine)
        scene.add(this.heightLine)

        this.pointA.userData.dependents ??= []
        this.pointB.userData.dependents ??= []
        this.pointC.userData.dependents ??= []
        this.pointAprime.userData.dependents ??= []

        this.pointA.userData.dependents.push(this)
        this.pointB.userData.dependents.push(this)
        this.pointC.userData.dependents.push(this)
        this.pointAprime.userData.dependents.push(this)

        this.pointAprime.userData.normalWheelController = this
        this.pointAprime.userData.lockMouseDrag = true

        this.update()
    }


    setSideCount(n: number) {
        this.sideCount = n
        this.update()
    }

    update() {
        const baseVertices = this.createPolygonVertices()
        if (baseVertices.length < 3) return

        const normal = this.getBaseNormal()
        if (!normal) return
        normal.multiplyScalar(-1)

        this.pointAprime.position.copy(
            this.pointA.position.clone().add(normal.clone().multiplyScalar(this.height))
        )

        const topVertices = baseVertices.map((p) =>
            p.clone().add(normal.clone().multiplyScalar(this.height))
        )

        this.updateLines(baseVertices, topVertices)
        this.updateMesh(baseVertices, topVertices)
        this.updateHeightLine()
    }

    moveAlongNormal(delta: number) {
        this.height += delta
        this.update()
    }

    private createPurplePoint(position: THREE.Vector3) {
        const geometry = new THREE.SphereGeometry(0.09, 24, 24)
        const material = new THREE.MeshStandardMaterial({
            color: 0x800080,
        })

        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.copy(position)
        return mesh
    }

    private createInitialC(A: THREE.Vector3, B: THREE.Vector3) {
        const AB = new THREE.Vector3().subVectors(B, A)
        const length = AB.length()

        const mid = new THREE.Vector3()
            .addVectors(A, B)
            .multiplyScalar(0.5)

        const ABxz = new THREE.Vector3(AB.x, 0, AB.z)

        if (ABxz.length() < 0.0001) {
            return mid.clone().add(new THREE.Vector3(1, 0, 0))
        }

        ABxz.normalize()

        const perpendicular = new THREE.Vector3(
            -ABxz.z,
            0,
            ABxz.x
        )

        return mid.add(perpendicular.multiplyScalar(length))
    }

    private createPolygonVertices() {
        const A = this.pointA.position.clone()
        const B = this.pointB.position.clone()
        const C = this.pointC.position.clone()

        const n = this.sideCount
        const theta = (2 * Math.PI) / n

        const AB = new THREE.Vector3().subVectors(B, A)
        const AC = new THREE.Vector3().subVectors(C, A)

        const sideLength = AB.length()

        if (sideLength < 0.0001) {
            return [A]
        }

        let normal = new THREE.Vector3().crossVectors(AB, AC)

        if (normal.length() < 0.0001) {
            return [A, B]
        }

        normal.normalize()

        const mid = new THREE.Vector3()
            .addVectors(A, B)
            .multiplyScalar(0.5)

        let perpendicularInPlane = new THREE.Vector3()
            .crossVectors(normal, AB)
            .normalize()

        const centerDistance = sideLength / (2 * Math.tan(Math.PI / n))

        // M noktası C'nin ters tarafında olsun.
        if (new THREE.Vector3().subVectors(C, mid).dot(perpendicularInPlane) > 0) {
            perpendicularInPlane.multiplyScalar(-1)
        }

        const center = mid
            .clone()
            .add(perpendicularInPlane.multiplyScalar(centerDistance))

        const testB = this.rotateAroundAxis(A, center, normal, theta)

        if (testB.distanceTo(B) > 0.001) {
            normal.multiplyScalar(-1)
        }

        const vertices: THREE.Vector3[] = []

        for (let i = 0; i < n; i++) {
            vertices.push(
                this.rotateAroundAxis(A, center, normal, theta * i)
            )
        }

        return vertices
    }

    private getBaseNormal() {
        const A = this.pointA.position.clone()
        const B = this.pointB.position.clone()
        const C = this.pointC.position.clone()

        const AB = new THREE.Vector3().subVectors(B, A)
        const AC = new THREE.Vector3().subVectors(C, A)

        const normal = new THREE.Vector3().crossVectors(AB, AC)

        if (normal.length() < 0.0001) {
            return null
        }

        return normal.normalize()
    }

    private updateLines(
        baseVertices: THREE.Vector3[],
        topVertices: THREE.Vector3[]
    ) {
        this.baseLine.geometry.dispose()
        this.baseLine.geometry = new THREE.BufferGeometry().setFromPoints(baseVertices)

        this.topLine.geometry.dispose()
        this.topLine.geometry = new THREE.BufferGeometry().setFromPoints(topVertices)
    }

    private updateHeightLine() {
        const points = [
            this.pointA.position.clone(),
            this.pointAprime.position.clone(),
        ]

        this.heightLine.geometry.dispose()
        this.heightLine.geometry = new THREE.BufferGeometry().setFromPoints(points)
        this.heightLine.computeLineDistances()
    }

    private updateMesh(
        baseVertices: THREE.Vector3[],
        topVertices: THREE.Vector3[]
    ) {
        const n = baseVertices.length

        const vertices: number[] = []
        const indices: number[] = []

        for (const p of baseVertices) {
            vertices.push(p.x, p.y, p.z)
        }

        for (const p of topVertices) {
            vertices.push(p.x, p.y, p.z)
        }

        for (let i = 1; i < n - 1; i++) {
            indices.push(0, i, i + 1)
        }

        for (let i = 1; i < n - 1; i++) {
            indices.push(n, n + i + 1, n + i)
        }

        for (let i = 0; i < n; i++) {
            const next = (i + 1) % n

            const a = i
            const b = next
            const c = n + next
            const d = n + i

            indices.push(a, b, d)
            indices.push(b, c, d)
        }

        const geometry = new THREE.BufferGeometry()

        geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(vertices, 3)
        )

        geometry.setIndex(indices)
        geometry.computeVertexNormals()

        this.mesh.geometry.dispose()
        this.mesh.geometry = geometry
    }

    private rotateAroundAxis(
        point: THREE.Vector3,
        center: THREE.Vector3,
        axis: THREE.Vector3,
        angle: number
    ) {
        return point
            .clone()
            .sub(center)
            .applyAxisAngle(axis, angle)
            .add(center)
    }
}









/* import * as THREE from "three"
import { createPoint } from "./Point"

export class PrismDemoObject {
    pointA: THREE.Mesh
    pointB: THREE.Mesh
    pointC: THREE.Mesh

    polygonLine: THREE.LineLoop

    sideCount = 4

    constructor(
        scene: THREE.Scene,
        selectableObjects: THREE.Object3D[],
        A: THREE.Vector3,
        B: THREE.Vector3,
        sideCount = 4
    ) {
        this.sideCount = sideCount

        const pointAObject = createPoint(A)
        const pointBObject = createPoint(B)
        const pointCObject = createPoint(this.createInitialC(A, B))

        this.pointA = pointAObject
        this.pointB = pointBObject
        this.pointC = pointCObject

        scene.add(this.pointA)
        scene.add(this.pointB)
        scene.add(this.pointC)

        selectableObjects.push(this.pointA)
        selectableObjects.push(this.pointB)
        selectableObjects.push(this.pointC)

        const geometry = new THREE.BufferGeometry()
        const material = new THREE.LineBasicMaterial({
            color: 0x000000,
        })

        this.polygonLine = new THREE.LineLoop(geometry, material)
        scene.add(this.polygonLine)

        this.pointA.userData.dependents ??= []
        this.pointB.userData.dependents ??= []
        this.pointC.userData.dependents ??= []

        this.pointA.userData.dependents.push(this)
        this.pointB.userData.dependents.push(this)
        this.pointC.userData.dependents.push(this)

        this.update()
    }

    update() {
        const vertices = this.createPolygonVertices()

        this.polygonLine.geometry.dispose()
        this.polygonLine.geometry = new THREE.BufferGeometry().setFromPoints(vertices)
    }

    private createInitialC(A: THREE.Vector3, B: THREE.Vector3) {
        const AB = new THREE.Vector3().subVectors(B, A)
        const length = AB.length()

        const mid = new THREE.Vector3()
            .addVectors(A, B)
            .multiplyScalar(0.5)

        const ABxz = new THREE.Vector3(AB.x, 0, AB.z)

        if (ABxz.length() < 0.0001) {
            return mid.clone().add(new THREE.Vector3(1, 0, 0))
        }

        ABxz.normalize()

        const perpendicular = new THREE.Vector3(
            -ABxz.z,
            0,
            ABxz.x
        )

        return mid.add(perpendicular.multiplyScalar(length))
    }

    private createPolygonVertices() {
        const A = this.pointA.position.clone()
        const B = this.pointB.position.clone()
        const C = this.pointC.position.clone()

        const n = this.sideCount
        const theta = (2 * Math.PI) / n

        const AB = new THREE.Vector3().subVectors(B, A)
        const AC = new THREE.Vector3().subVectors(C, A)

        const sideLength = AB.length()

        if (sideLength < 0.0001) {
            return [A]
        }

        let normal = new THREE.Vector3().crossVectors(AB, AC)

        if (normal.length() < 0.0001) {
            return [A, B]
        }

        normal.normalize()

        const mid = new THREE.Vector3()
            .addVectors(A, B)
            .multiplyScalar(0.5)

        let perpendicularInPlane = new THREE.Vector3()
            .crossVectors(normal, AB)
            .normalize()

        const centerDistance = sideLength / (2 * Math.tan(Math.PI / n))

        if (new THREE.Vector3().subVectors(C, mid).dot(perpendicularInPlane) > 0) {
            perpendicularInPlane.multiplyScalar(-1)
        }

        const center = mid
            .clone()
            .add(perpendicularInPlane.multiplyScalar(centerDistance))

        const testB = this.rotateAroundAxis(A, center, normal, theta)

        if (testB.distanceTo(B) > 0.001) {
            normal.multiplyScalar(-1)
        }

        const vertices: THREE.Vector3[] = []

        for (let i = 0; i < n; i++) {
            const rotated = this.rotateAroundAxis(
                A,
                center,
                normal,
                theta * i
            )

            vertices.push(rotated)
        }

        return vertices
    }

    private rotateAroundAxis(
        point: THREE.Vector3,
        center: THREE.Vector3,
        axis: THREE.Vector3,
        angle: number
    ) {
        return point
            .clone()
            .sub(center)
            .applyAxisAngle(axis, angle)
            .add(center)
    }
} */