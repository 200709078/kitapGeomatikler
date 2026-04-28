import * as THREE from "three"

export class AngleObject {
  pointA: THREE.Mesh
  vertexB: THREE.Mesh
  pointC: THREE.Mesh
  arc: THREE.Line
  label: THREE.Sprite

  radius = 0.8

  constructor(pointA: THREE.Mesh, vertexB: THREE.Mesh, pointC: THREE.Mesh) {
    this.pointA = pointA
    this.vertexB = vertexB
    this.pointC = pointC

    const geometry = new THREE.BufferGeometry()
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 })

    this.arc = new THREE.Line(geometry, material)

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
    canvas.width = 256
    canvas.height = 128

    const context = canvas.getContext("2d")!
    context.clearRect(0, 0, canvas.width, canvas.height)

    context.font = "bold 48px Arial"
    context.fillStyle = "#ff0000"
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
    sprite.scale.set(0.7, 0.35, 1)

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
    this.arc.geometry = new THREE.BufferGeometry().setFromPoints(points)

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
  }
}