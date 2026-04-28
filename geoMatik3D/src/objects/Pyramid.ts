import * as THREE from "three"

export class Pyramid {
    pointA: THREE.Mesh
    pointB: THREE.Mesh
    sideCount: number
    height: number
    mesh: THREE.Mesh

    constructor(
        pointA: THREE.Mesh,
        pointB: THREE.Mesh,
        sideCount: number,
        height: number
    ) {
        this.pointA = pointA
        this.pointB = pointB
        this.sideCount = sideCount
        this.height = height

        const geometry = this.createGeometry()

        const material = new THREE.MeshStandardMaterial({
            color: 0xc084fc,
            transparent: true,
            opacity: 0.85,
            side: THREE.DoubleSide,
        })

        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true
        this.pointA.userData.dependents ??= []
        this.pointB.userData.dependents ??= []

        this.pointA.userData.dependents.push(this)
        this.pointB.userData.dependents.push(this)


        this.pointA.userData.prismPair = this.pointB
        this.pointB.userData.prismPair = this.pointA


    }

    update() {
        this.mesh.geometry.dispose()
        this.mesh.geometry = this.createGeometry()
    }

    private createGeometry() {
        const baseVertices = this.buildBase(
            this.pointA.position,
            this.pointB.position,
            this.sideCount
        )

        return this.buildGeometry(baseVertices, this.height)
    }

    private buildBase(
        A: THREE.Vector3,
        B: THREE.Vector3,
        n: number
    ): THREE.Vector3[] {
        const edge = new THREE.Vector3().subVectors(B, A)
        const s = edge.length()

        let dir = edge.clone().normalize()

        const angleStep = -(2 * Math.PI) / n

        const vertices: THREE.Vector3[] = []

        vertices.push(A.clone())
        vertices.push(B.clone())

        let prev = B.clone()

        for (let i = 2; i < n; i++) {
            const rotatedDir = new THREE.Vector3(
                dir.x * Math.cos(angleStep) - dir.z * Math.sin(angleStep),
                0,
                dir.x * Math.sin(angleStep) + dir.z * Math.cos(angleStep)
            ).normalize()

            const next = prev.clone().add(rotatedDir.multiplyScalar(s))

            vertices.push(next)

            prev = next
            dir = rotatedDir
        }

        return vertices
    }

    private buildGeometry(
        base: THREE.Vector3[],
        height: number
    ): THREE.BufferGeometry {
        const n = base.length

        const vertices: number[] = []
        const indices: number[] = []

        // Alt taban köşeleri
        for (let i = 0; i < n; i++) {
            vertices.push(base[i].x, base[i].y, base[i].z)
        }

        // Taban merkezi
        const center = new THREE.Vector3()

        base.forEach((v) => {
            center.add(v)
        })

        center.multiplyScalar(1 / n)

        // Tepe noktası
        const apexIndex = n

        vertices.push(
            center.x,
            center.y + height,
            center.z
        )

        // Alt taban üçgenleri
        for (let i = 1; i < n - 1; i++) {
            indices.push(0, i + 1, i)
        }

        // Yan yüzler
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

        return geometry
    }
}