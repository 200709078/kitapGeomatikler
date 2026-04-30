import * as THREE from "three"
import { createPoint } from "./Point"

export class Pyramid {
    pointA: THREE.Mesh
    pointB: THREE.Mesh
    pointC: THREE.Mesh

    apexPoint: THREE.Mesh
    centerPoint: THREE.Mesh
    cornerPoints: THREE.Mesh[] = []

    mesh: THREE.Mesh
    baseLine: THREE.LineLoop
    sideLines: THREE.LineSegments

    selectableObjects: THREE.Object3D[]

    sideCount: number
    height: number

    constructor(
        scene: THREE.Scene,
        selectableObjects: THREE.Object3D[],
        pointA: THREE.Mesh,
        pointB: THREE.Mesh,
        sideCount = 4
    ) {
        this.selectableObjects = selectableObjects

        this.pointA = pointA
        this.pointB = pointB
        this.sideCount = sideCount
        this.height = pointA.position.distanceTo(pointB.position)

        const pointCObject = createPoint(
            this.createInitialC(pointA.position, pointB.position)
        )

        this.pointC = pointCObject
        this.apexPoint = this.createPurplePoint(pointA.position.clone())
        this.centerPoint = this.createGrayPoint(pointA.position.clone())

        this.apexPoint.userData.normalWheelController = this
        this.apexPoint.userData.lockMouseDrag = true

        this.centerPoint.userData.lockMouseDrag = true
        this.centerPoint.userData.lockWheel = true
        this.centerPoint.userData.dependents ??= []

        scene.add(this.pointC)
        scene.add(this.apexPoint)
        scene.add(this.centerPoint)

        selectableObjects.push(this.pointC)
        selectableObjects.push(this.apexPoint)
        selectableObjects.push(this.centerPoint)

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

        this.sideLines = new THREE.LineSegments(
            new THREE.BufferGeometry(),
            new THREE.LineBasicMaterial({ color: 0x000000 })
        )

        scene.add(this.mesh)
        scene.add(this.baseLine)
        scene.add(this.sideLines)

        this.pointA.userData.dependents ??= []
        this.pointB.userData.dependents ??= []
        this.pointC.userData.dependents ??= []
        this.apexPoint.userData.dependents ??= []

        this.pointA.userData.dependents.push(this)
        this.pointB.userData.dependents.push(this)
        this.pointC.userData.dependents.push(this)
        //this.apexPoint.userData.dependents.push(this)

        this.update()
    }

    setSideCount(n: number) {
        this.sideCount = n
        this.update()
    }

    moveAlongNormal(delta: number) {
        this.height += delta
        this.update()
    }

    update() {
        const baseVertices = this.createPolygonVertices()
        if (baseVertices.length < 3) return

        const normal = this.getBaseNormal()
        if (!normal) return

        normal.multiplyScalar(-1)

        const center = this.getPolygonCenter(baseVertices)
        const apex = center.clone().add(
            normal.clone().multiplyScalar(this.height)
        )

        this.centerPoint.position.copy(center)
        this.apexPoint.position.copy(apex)

        this.updateDependentsOf(this.centerPoint)
        this.updateDependentsOf(this.apexPoint)

        this.updateBaseLine(baseVertices)
        this.updateSideLines(baseVertices, apex)
        this.updateCornerPoints(baseVertices)
        this.updateMesh(baseVertices, apex)
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

    private createGrayPoint(position: THREE.Vector3) {
        const geometry = new THREE.SphereGeometry(0.09, 24, 24)

        const material = new THREE.MeshStandardMaterial({
            color: 0x808080,
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

    private getPolygonCenter(vertices: THREE.Vector3[]) {
        const center = new THREE.Vector3()

        for (const vertex of vertices) {
            center.add(vertex)
        }

        return center.divideScalar(vertices.length)
    }

    private updateBaseLine(baseVertices: THREE.Vector3[]) {
        this.baseLine.geometry.dispose()
        this.baseLine.geometry = new THREE.BufferGeometry().setFromPoints(baseVertices)
    }

    private updateSideLines(
        baseVertices: THREE.Vector3[],
        apex: THREE.Vector3
    ) {
        const points: THREE.Vector3[] = []

        for (const vertex of baseVertices) {
            points.push(vertex.clone())
            points.push(apex.clone())
        }

        this.sideLines.geometry.dispose()
        this.sideLines.geometry = new THREE.BufferGeometry().setFromPoints(points)
    }

    private updateCornerPoints(baseVertices: THREE.Vector3[]) {
        const verticesForGrayPoints = baseVertices.slice(2)

        while (this.cornerPoints.length < verticesForGrayPoints.length) {
            const point = this.createGrayPoint(new THREE.Vector3())

            point.userData.lockMouseDrag = true
            point.userData.lockWheel = true
            point.userData.dependents ??= []

            this.cornerPoints.push(point)
            this.selectableObjects.push(point)
            this.mesh.parent?.add(point)
        }

        for (let i = 0; i < verticesForGrayPoints.length; i++) {
            this.cornerPoints[i].position.copy(verticesForGrayPoints[i])
            this.cornerPoints[i].visible = true

            this.updateDependentsOf(this.cornerPoints[i])
        }

        for (let i = verticesForGrayPoints.length; i < this.cornerPoints.length; i++) {
            this.cornerPoints[i].visible = false
        }
    }

    private updateMesh(
        baseVertices: THREE.Vector3[],
        apex: THREE.Vector3
    ) {
        const n = baseVertices.length

        const vertices: number[] = []
        const indices: number[] = []

        for (const p of baseVertices) {
            vertices.push(p.x, p.y, p.z)
        }

        vertices.push(apex.x, apex.y, apex.z)

        const apexIndex = n

        for (let i = 1; i < n - 1; i++) {
            indices.push(0, i, i + 1)
        }

        for (let i = 0; i < n; i++) {
            const next = (i + 1) % n
            indices.push(i, next, apexIndex)
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

    private updateDependentsOf(object: THREE.Object3D) {
        object.userData.dependents?.forEach((dependent: any) => {
            if (dependent === this) return

            dependent.update?.()
        })
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

    getHeightDirection() {
        const direction = new THREE.Vector3()
            .subVectors(this.apexPoint.position, this.centerPoint.position)

        if (direction.length() < 0.0001) {
            return new THREE.Vector3(0, 1, 0)
        }

        return direction.normalize()
    }
}