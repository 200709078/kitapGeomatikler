import * as THREE from "three"
import { getRandomColor } from "../utils/color"

export class SphereObject {
  centerPoint: THREE.Mesh
  surfacePoint: THREE.Mesh
  mesh: THREE.Mesh
  radiusSegment: THREE.Mesh | null = null
  originalRadiusColor: THREE.Color | null = null

  constructor(
    centerPoint: THREE.Mesh,
    surfacePoint: THREE.Mesh,
    selectableObjects?: THREE.Object3D[],
    radiusSegment?: THREE.Mesh
  ) {
    this.centerPoint = centerPoint
    this.surfacePoint = surfacePoint
    this.radiusSegment = radiusSegment ?? null

    const geometry = new THREE.SphereGeometry(1, 32, 32)
    const material = new THREE.MeshStandardMaterial({
      color: getRandomColor(),
      transparent: true,
      opacity: 0.55,
    })

    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.castShadow = true
    this.mesh.receiveShadow = true
    this.mesh.userData.selectableType = "solid"
    this.mesh.userData.owner = this
    this.mesh.userData.selectionOutline = "none"

    selectableObjects?.push(this.mesh)

    this.centerPoint.userData.dependents ??= []
    this.surfacePoint.userData.dependents ??= []

    this.centerPoint.userData.dependents.push(this)
    this.surfacePoint.userData.dependents.push(this)

    this.update()
  }

  onSelect() {
    const material = this.radiusSegment?.material

    if (!material || Array.isArray(material) || !("color" in material)) return

    const colorMaterial = material as THREE.Material & { color: THREE.Color }

    this.originalRadiusColor = colorMaterial.color.clone()
    colorMaterial.color.set(0xffaa00)
  }

  onDeselect() {
    const material = this.radiusSegment?.material

    if (
      !this.originalRadiusColor ||
      !material ||
      Array.isArray(material) ||
      !("color" in material)
    ) {
      return
    }

    const colorMaterial = material as THREE.Material & { color: THREE.Color }

    colorMaterial.color.copy(this.originalRadiusColor)
    this.originalRadiusColor = null
  }

  update() {
    const center = this.centerPoint.position
    const surface = this.surfacePoint.position

    const radius = center.distanceTo(surface)

    this.mesh.position.copy(center)
    this.mesh.scale.set(radius, radius, radius)
  }
}
