import * as THREE from "three"

export class AngleObject {
  pointA: THREE.Mesh
  vertexB: THREE.Mesh
  pointC: THREE.Mesh

  arc: THREE.Mesh
  label: THREE.Sprite

  lineAB: THREE.Line
  lineBC: THREE.Line

  radius = 0.8

  constructor(pointA: THREE.Mesh, vertexB: THREE.Mesh, pointC: THREE.Mesh) {
    this.pointA = pointA
    this.vertexB = vertexB
    this.pointC = pointC

    const arcGeometry = new THREE.BufferGeometry()
    const arcMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })

    this.arc = new THREE.Mesh(arcGeometry, arcMaterial)

    this.label = this.createAngleLabel("0°")
    this.arc.add(this.label)

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 })

    this.lineAB = new THREE.Line(new THREE.BufferGeometry(), lineMaterial)
    this.lineBC = new THREE.Line(new THREE.BufferGeometry(), lineMaterial.clone())

    this.pointA.userData.dependents ??= []
    this.vertexB.userData.dependents ??= []
    this.pointC.userData.dependents ??= []

    this.pointA.userData.dependents.push(this)
    this.vertexB.userData.dependents.push(this)
    this.pointC.userData.dependents.push(this)

    this.update()
  }

  createAngleLabel(text: string) {
    const canvas = document.createElement("canvas")
    canvas.width = 512
    canvas.height = 256

    const context = canvas.getContext("2d")!
    context.clearRect(0, 0, canvas.width, canvas.height)

    context.font = "bold 100px Arial"
    context.fillStyle = "#ff0000"
    context.textAlign = "center"
    context.textBaseline = "middle"
    context.fillText(text, canvas.width / 2, canvas.height / 2)

    const texture = new THREE.CanvasTexture(canvas)

    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: false,
    })

    const sprite = new THREE.Sprite(material)
    sprite.scale.set(2, 1, 1)

    return sprite
  }

  updateAngleLabel(text: string) {
    const oldMaterial = this.label.material as THREE.SpriteMaterial

    oldMaterial.map?.dispose()
    oldMaterial.dispose()

    const newLabel = this.createAngleLabel(text)

    this.label.material = newLabel.material
    this.label.scale.copy(newLabel.scale)
  }

  update() {
    const a = this.pointA.position
    const b = this.vertexB.position
    const c = this.pointC.position

    const v1Raw = new THREE.Vector3().subVectors(a, b)
    const v2Raw = new THREE.Vector3().subVectors(c, b)

    if (v1Raw.length() < 0.0001 || v2Raw.length() < 0.0001) {
      return
    }

    const v1 = v1Raw.clone().normalize()
    const v2 = v2Raw.clone().normalize()

    const angle = v1.angleTo(v2)

    const normal = new THREE.Vector3().crossVectors(v1, v2)

    if (normal.length() < 0.0001) {
      return
    }

    normal.normalize()

    const points: THREE.Vector3[] = []
    const segments = 32

    for (let i = 0; i <= segments; i++) {
      const t = i / segments

      const dir = new THREE.Vector3()
        .copy(v1)
        .applyAxisAngle(normal, angle * t)

      points.push(
        new THREE.Vector3()
          .copy(b)
          .add(dir.multiplyScalar(this.radius))
      )
    }

    this.arc.geometry.dispose()

    const curve = new THREE.CatmullRomCurve3(points)

    this.arc.geometry = new THREE.TubeGeometry(
      curve,
      32,
      0.04,
      8,
      false
    )

    const degree = THREE.MathUtils.radToDeg(angle)
    this.updateAngleLabel(`${degree.toFixed(0)}°`)

    const middleDir = new THREE.Vector3()
      .copy(v1)
      .applyAxisAngle(normal, angle / 2)
      .normalize()

    this.label.position
      .copy(b)
      .add(middleDir.multiplyScalar(this.radius + 0.35))

    this.updateArms(a, b, c)
  }

  private updateArms(
    a: THREE.Vector3,
    b: THREE.Vector3,
    c: THREE.Vector3
  ) {
    this.lineAB.geometry.dispose()
    this.lineAB.geometry = new THREE.BufferGeometry().setFromPoints([
      a.clone(),
      b.clone(),
    ])

    this.lineBC.geometry.dispose()
    this.lineBC.geometry = new THREE.BufferGeometry().setFromPoints([
      b.clone(),
      c.clone(),
    ])
  }
}





/* import * as THREE from "three"

export class AngleObject {
  pointA: THREE.Mesh
  vertexB: THREE.Mesh
  pointC: THREE.Mesh
  arc: THREE.Mesh
  label: THREE.Sprite

  lineAB: THREE.Line
  lineBC: THREE.Line

  radius = 0.8

  constructor(pointA: THREE.Mesh, vertexB: THREE.Mesh, pointC: THREE.Mesh) {
    this.pointA = pointA
    this.vertexB = vertexB
    this.pointC = pointC

    const geometry = new THREE.BufferGeometry()
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff })

    this.arc = new THREE.Mesh(geometry, material)

    const mat = new THREE.LineBasicMaterial({ color: 0x000000 })

    this.lineAB = new THREE.Line(new THREE.BufferGeometry(), mat)
    this.lineBC = new THREE.Line(new THREE.BufferGeometry(), mat)

    this.label = this.createAngleLabel("0°")
    this.arc.add(this.label)

    this.pointA.userData.dependents ??= []
    this.vertexB.userData.dependents ??= []
    this.pointC.userData.dependents ??= []

    this.pointA.userData.dependents.push(this)
    this.vertexB.userData.dependents.push(this)
    this.pointC.userData.dependents.push(this)

    this.update()
  }

  createAngleLabel(text: string) {
    const canvas = document.createElement("canvas")
    canvas.width = 512
    canvas.height = 256

    const context = canvas.getContext("2d")!
    context.clearRect(0, 0, canvas.width, canvas.height)

    context.font = "bold 100px Arial"
    context.fillStyle = "#0000ff"
    context.textAlign = "center"
    context.textBaseline = "middle"
    context.fillText(text, canvas.width / 2, canvas.height / 2)

    const texture = new THREE.CanvasTexture(canvas)
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: false
    })

    const sprite = new THREE.Sprite(material)
    sprite.scale.set(2, 1, 1)

    return sprite
  }

  updateAngleLabel(text: string) {
    const oldMaterial = this.label.material as THREE.SpriteMaterial
    oldMaterial.map?.dispose()
    oldMaterial.dispose()

    const newLabel = this.createAngleLabel(text)

    this.label.material = newLabel.material
    this.label.scale.copy(newLabel.scale)
  }

  update() {
    const a = this.pointA.position
    const b = this.vertexB.position
    const c = this.pointC.position

    const v1 = new THREE.Vector3().subVectors(a, b).normalize()
    const v2 = new THREE.Vector3().subVectors(c, b).normalize()

    const angle = v1.angleTo(v2)
    const normal = new THREE.Vector3().crossVectors(v1, v2).normalize()

    const points: THREE.Vector3[] = []
    const segments = 32

    for (let i = 0; i <= segments; i++) {
      const t = i / segments

      const dir = new THREE.Vector3()
        .copy(v1)
        .applyAxisAngle(normal, angle * t)

      points.push(
        new THREE.Vector3()
          .copy(b)
          .add(dir.multiplyScalar(this.radius))
      )
    }

    this.arc.geometry.dispose()
    const curve = new THREE.CatmullRomCurve3(points)

    this.arc.geometry = new THREE.TubeGeometry(
      curve,
      32,
      0.03,
      8,
      false
    )

    const degree = THREE.MathUtils.radToDeg(angle)
    this.updateAngleLabel(`${degree.toFixed(0)}°`)

    const middleDir = new THREE.Vector3()
      .copy(v1)
      .applyAxisAngle(normal, angle / 2)
      .normalize()

    this.label.position
      .copy(b)
      .add(
        middleDir.multiplyScalar(this.radius + 0.35)
      )


    this.lineAB.geometry.dispose()
    this.lineAB.geometry = new THREE.BufferGeometry().setFromPoints([
      a,
      b
    ])

    this.lineBC.geometry.dispose()
    this.lineBC.geometry = new THREE.BufferGeometry().setFromPoints([
      b,
      c
    ])
  }
} */