import * as THREE from "three"
import { createPoint } from "./Point"
import { getNearestSelectablePoint } from "../interaction/getNearestSelectablePoint"

export class Prism {
  pointA: THREE.Mesh
  pointB: THREE.Mesh
  pointC: THREE.Mesh
  pointAprime: THREE.Mesh

  mesh: THREE.Mesh
  baseLine: THREE.LineLoop
  topLine: THREE.LineLoop
  heightLine: THREE.Line

  sideLines: THREE.LineSegments
  cornerPoints: THREE.Mesh[] = []

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
    this.pointA = pointA
    this.pointB = pointB
    this.sideCount = sideCount
    this.height = pointA.position.distanceTo(pointB.position)
    this.selectableObjects = selectableObjects

    const pointCObject = createPoint(
      this.createInitialC(pointA.position, pointB.position)
    )

    this.pointC = pointCObject
    this.pointAprime = this.createPurplePoint(pointA.position.clone())

    scene.add(this.pointC)
    scene.add(this.pointAprime)

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

    this.sideLines = new THREE.LineSegments(
      new THREE.BufferGeometry(),
      new THREE.LineBasicMaterial({ color: 0x000000 })
    )

    scene.add(this.mesh)
    scene.add(this.baseLine)
    scene.add(this.topLine)
    scene.add(this.heightLine)
    scene.add(this.sideLines)

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

  moveAlongNormal(delta: number) {
    this.height += delta
    this.update()
  }

  update() {
    const baseVertices = this.createPolygonVertices()
    if (baseVertices.length < 3) return

    const normal = this.getBaseNormal()
    if (!normal) return

    // Prizma tabanın diğer tarafında oluşsun.
    normal.multiplyScalar(-1)

    this.pointAprime.position.copy(
      this.pointA.position.clone().add(
        normal.clone().multiplyScalar(this.height)
      )
    )

    const topVertices = baseVertices.map((p) =>
      p.clone().add(normal.clone().multiplyScalar(this.height))
    )

    this.updateLines(baseVertices, topVertices)
    this.updateSideLines(baseVertices, topVertices)
    this.updateCornerPoints(baseVertices, topVertices)
    this.updateMesh(baseVertices, topVertices)
    this.updateHeightLine()
  }

  private updateSideLines(
    baseVertices: THREE.Vector3[],
    topVertices: THREE.Vector3[]
  ) {
    const points: THREE.Vector3[] = []

    for (let i = 1; i < baseVertices.length; i++) {
      points.push(baseVertices[i].clone())
      points.push(topVertices[i].clone())
    }

    this.sideLines.geometry.dispose()
    this.sideLines.geometry = new THREE.BufferGeometry().setFromPoints(points)
  }

  private updateCornerPoints(
    baseVertices: THREE.Vector3[],
    topVertices: THREE.Vector3[]
  ) {
    const allVertices = [
      ...baseVertices.slice(2),
      ...topVertices.slice(1)
    ]

    while (this.cornerPoints.length < allVertices.length) {
      const point = this.createGrayPoint(new THREE.Vector3())

      point.userData.lockMouseDrag = true
      point.userData.lockWheel = true
      point.userData.dependents ??= []

      this.cornerPoints.push(point)
      this.selectableObjects.push(point)
      this.mesh.parent?.add(point)
    }

    for (let i = 0; i < allVertices.length; i++) {
      this.cornerPoints[i].position.copy(allVertices[i])
      this.cornerPoints[i].visible = true

      this.cornerPoints[i].userData.dependents?.forEach((dependent: any) => {
        dependent.update?.()
      })
    }

    for (let i = allVertices.length; i < this.cornerPoints.length; i++) {
      this.cornerPoints[i].visible = false
    }
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

export class Prism {
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
      color: 0xd2a679,
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

    // Diğer tarafa oluşması için negatifti, bu sende düzgün çalışmıştı.
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

    for (let i = 0; i < n; i++) {
      vertices.push(base[i].x, base[i].y, base[i].z)
    }

    for (let i = 0; i < n; i++) {
      vertices.push(base[i].x, base[i].y + height, base[i].z)
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

    return geometry
  }
} */