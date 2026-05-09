import * as THREE from "three"

type RotateMenuItem = {
  element: HTMLElement
  placement: "center" | "orbit"
  tool: string
}

const ROTATE_MENU_TOOLS = [
  "select",
  "point",
  "lineSegment",
  "line",
  "ray",
  "angle",
  "plane",
  "sphere",
  "prism",
  "pyramid",
  "cylinder",
  "cone",
  "unfold",
]
const ROTATE_MENU_TOOL_LABELS: Record<string, string> = {
  select: "Seçme/Taşıma",
  point: "Nokta",
  lineSegment: "Doğru Parçası",
  line: "Doğru",
  ray: "Yarı Doğru",
  angle: "Açı",
  plane: "Düzlem",
  sphere: "Küre",
  prism: "Prizma",
  pyramid: "Piramit",
  cylinder: "Silindir",
  cone: "Koni",
  unfold: "Açınım",
}
const CONTROL_POINT_BLUE = 0x0066ff
const CONTROL_POINT_BLUE_EMISSIVE = 0x0048c8
const CONTROL_POINT_PURPLE = 0x8b5cf6
const CONTROL_POINT_PURPLE_EMISSIVE = 0x4c1d95
const CONTROL_POINT_GRAY = 0x6b7280
const CONTROL_POINT_GRAY_EMISSIVE = 0x1f2937

export function createRotateMenu() {
  const savedPosition = loadRotateMenuPosition()
  const container = document.createElement("div")
  container.id = "rotateMenu"
  const toolsArr: RotateMenuItem[] = []
  let orbitRotation = 0

  if (savedPosition) {
    container.style.left = `${savedPosition.x}px`
    container.style.top = `${savedPosition.y}px`
    container.style.transform = "none"
  }

  const centerItem = document.createElement("div")
  centerItem.className = "rotateMenuCenterItem"
  setRotateMenuItemLabel(centerItem, ROTATE_MENU_TOOLS[0], false)
  centerItem.appendChild(createToolIcon(ROTATE_MENU_TOOLS[0], true))

  toolsArr.push({
    element: centerItem,
    placement: "center",
    tool: ROTATE_MENU_TOOLS[0],
  })
  container.appendChild(centerItem)

  for (let i = 0; i < 12; i++) {
    const orbitItem = document.createElement("div")
    const tool = ROTATE_MENU_TOOLS[i + 1]

    orbitItem.className = "rotateMenuOrbitItem"
    setRotateMenuItemLabel(orbitItem, tool, false)
    orbitItem.appendChild(createToolIcon(tool, false))
    toolsArr.push({
      element: orbitItem,
      placement: "orbit",
      tool,
    })
    container.appendChild(orbitItem)
  }

  updateRotateMenuItems(toolsArr, orbitRotation)
  document.body.appendChild(container)
  attachRotateMenuTooltip(container, toolsArr)
  makeRotateMenuDraggable(container, toolsArr[0].element)
  makeOrbitDraggable(container, getOrbitElements(toolsArr), (rotation) => {
    orbitRotation = rotation
    updateRotateMenuItems(toolsArr, orbitRotation)
  })

  return container
}

function setRotateMenuItemLabel(element: HTMLElement, tool: string, showNativeHint = true) {
  const label = ROTATE_MENU_TOOL_LABELS[tool] ?? tool

  if (showNativeHint) {
    element.dataset.tooltip = label
  } else {
    element.removeAttribute("title")
    delete element.dataset.tooltip
  }

  element.setAttribute("aria-label", label)
}

function createToolIcon(tool: string, isCenter: boolean) {
  if (
    tool === "lineSegment" ||
    tool === "line" ||
    tool === "ray" ||
    tool === "sphere" ||
    tool === "prism" ||
    tool === "pyramid" ||
    tool === "cylinder" ||
    tool === "cone"
  ) {
    const icon = createMeshToolIcon(tool, isCenter)
    setRotateMenuItemLabel(icon, tool)
    return icon
  }

  if (tool === "angle") {
    const icon = createAngleToolIcon(isCenter)
    setRotateMenuItemLabel(icon, tool)
    return icon
  }

  const icon = document.createElement("div")

  icon.className = `rotateMenuToolIcon rotateMenuToolIcon-${tool}`
  setRotateMenuItemLabel(icon, tool)
  if (tool === "select") {
    icon.textContent = "☝"
  } else if (tool === "unfold") {
    icon.textContent = "A"
  }

  if (isCenter) {
    icon.classList.add("rotateMenuToolIcon-center")
  }

  return icon
}

function createAngleToolIcon(isCenter: boolean) {
  const icon = document.createElement("div")

  icon.className = "rotateMenuToolIcon rotateMenuToolIcon-angle"

  if (isCenter) {
    icon.classList.add("rotateMenuToolIcon-center")
  }

  icon.innerHTML = `
    <svg class="rotateMenuAngleSvg" viewBox="0 0 52 40" aria-hidden="true">
      <line class="rotateMenuAngleArm" x1="8" y1="30" x2="39" y2="30" />
      <line class="rotateMenuAngleArm" x1="8" y1="30" x2="31" y2="11" />
      <path class="rotateMenuAngleArrowHead" d="M 44 30 L 36 26 L 36 34 Z" />
      <path class="rotateMenuAngleArrowHead" d="M 34.5 8 L 26.5 11 L 31.7 17.3 Z" />
      <path class="rotateMenuAngleArc" d="M 24 30 A 16 16 0 0 0 20.4 19.8" />
      <circle class="rotateMenuAnglePoint" cx="8" cy="30" r="5.5" />
    </svg>
  `

  return icon
}

function createMeshToolIcon(tool: string, isCenter: boolean) {
  const icon = document.createElement("div")

  icon.className = `rotateMenuToolIcon rotateMenuToolIcon-${tool} rotateMenuToolIcon-mesh`

  if (isCenter) {
    icon.classList.add("rotateMenuToolIcon-center")
  }

  const width = 92
  const height = 64
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(width, height, false)
  renderer.domElement.width = width
  renderer.domElement.height = height
  renderer.domElement.style.width = `${width}px`
  renderer.domElement.style.height = `${height}px`
  renderer.domElement.style.display = "block"

  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-2.25, 2.25, 1.55, -1.55, 0.1, 20)

  camera.position.set(0, 0, 5)
  camera.lookAt(0, 0, 0)

  scene.add(new THREE.AmbientLight(0xffffff, 1.65))

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2)
  keyLight.position.set(-1.8, 2.3, 4)
  scene.add(keyLight)

  const fillLight = new THREE.DirectionalLight(0x6aa8ff, 1.2)
  fillLight.position.set(2.2, -1.2, 2)
  scene.add(fillLight)

  if (tool === "lineSegment") {
    scene.add(createLineSegmentMeshIcon())
  } else if (tool === "line") {
    scene.add(createLineMeshIcon())
  } else if (tool === "prism") {
    scene.add(createPrismMeshIcon())
  } else if (tool === "sphere") {
    scene.add(createSphereMeshIcon())
  } else if (tool === "pyramid") {
    scene.add(createPyramidMeshIcon())
  } else if (tool === "cylinder") {
    scene.add(createCylinderMeshIcon())
  } else if (tool === "cone") {
    scene.add(createConeMeshIcon())
  } else {
    scene.add(createRayMeshIcon())
  }

  renderer.render(scene, camera)
  icon.appendChild(renderer.domElement)

  return icon
}

function createLineSegmentMeshIcon() {
  const group = new THREE.Group()
  const body = createCylinderBetweenPoints(new THREE.Vector3(-0.89, 0, 0), new THREE.Vector3(0.89, 0, 0), 0.08)
  const pointA = createPoint(new THREE.Vector3(-1.02, 0, 0), CONTROL_POINT_BLUE, CONTROL_POINT_BLUE_EMISSIVE)
  const pointB = createPoint(new THREE.Vector3(1.02, 0, 0), CONTROL_POINT_BLUE, CONTROL_POINT_BLUE_EMISSIVE)

  group.rotation.z = THREE.MathUtils.degToRad(-18)
  group.add(body, pointA, pointB)

  return group
}

function createRayMeshIcon() {
  const group = new THREE.Group()
  const body = createCylinderBetweenPoints(new THREE.Vector3(-0.94, 0, 0), new THREE.Vector3(0.78, 0, 0), 0.08)
  const point = createPoint(new THREE.Vector3(-1.06, 0, 0), CONTROL_POINT_BLUE, CONTROL_POINT_BLUE_EMISSIVE)
  const arrowHead = createConeArrowHead(1)

  arrowHead.position.x = 1
  group.rotation.z = THREE.MathUtils.degToRad(-18)
  group.add(body, point, arrowHead)

  return group
}

function createPrismMeshIcon() {
  const group = new THREE.Group()
  const cubeGeometry = new THREE.BoxGeometry(1.45, 1.15, 1.15)
  const cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0x9fd3ff,
    transparent: true,
    opacity: 0.42,
    metalness: 0.02,
    roughness: 0.38,
    side: THREE.DoubleSide,
  })
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(cubeGeometry),
    new THREE.LineBasicMaterial({ color: 0x050505, depthTest: false })
  )
  const vertices = [
    new THREE.Vector3(-0.725, -0.575, 0.575),
    new THREE.Vector3(0.725, -0.575, 0.575),
    new THREE.Vector3(-0.725, 0.575, 0.575),
    new THREE.Vector3(0.725, 0.575, 0.575),
    new THREE.Vector3(-0.725, -0.575, -0.575),
    new THREE.Vector3(0.725, -0.575, -0.575),
    new THREE.Vector3(-0.725, 0.575, -0.575),
    new THREE.Vector3(0.725, 0.575, -0.575),
  ]

  group.add(cube, edges)
  vertices.forEach((vertex, index) => {
    const isBlue = index === 0 || index === 1
    const isPurple = index === 3
    const color = isBlue ? CONTROL_POINT_BLUE : isPurple ? CONTROL_POINT_PURPLE : CONTROL_POINT_GRAY
    const emissive = isBlue ? CONTROL_POINT_BLUE_EMISSIVE : isPurple ? CONTROL_POINT_PURPLE_EMISSIVE : CONTROL_POINT_GRAY_EMISSIVE

    group.add(createPoint(vertex, color, emissive, isPurple ? 0.16 : 0.14))
  })

  group.rotation.x = THREE.MathUtils.degToRad(-18)
  group.rotation.y = THREE.MathUtils.degToRad(32)
  group.rotation.z = THREE.MathUtils.degToRad(-8)

  return group
}

function createSphereMeshIcon() {
  const group = new THREE.Group()
  const radius = 0.58
  const center = new THREE.Vector3(0, 0, 0)
  const surfacePoint = new THREE.Vector3(0.46, 0.24, 0.24)
  const geometry = new THREE.SphereGeometry(radius, 48, 32)
  const material = new THREE.MeshStandardMaterial({
    color: 0x44aa88,
    transparent: true,
    opacity: 0.38,
    metalness: 0.02,
    roughness: 0.34,
    side: THREE.DoubleSide,
  })
  const sphere = new THREE.Mesh(geometry, material)

  group.add(
    sphere,
    createDashedLine(center, surfacePoint),
    createPoint(center, CONTROL_POINT_BLUE, CONTROL_POINT_BLUE_EMISSIVE, 0.14),
    createPoint(surfacePoint, CONTROL_POINT_BLUE, CONTROL_POINT_BLUE_EMISSIVE, 0.14)
  )

  group.rotation.x = THREE.MathUtils.degToRad(-14)
  group.rotation.y = THREE.MathUtils.degToRad(28)
  group.rotation.z = THREE.MathUtils.degToRad(-8)

  return group
}

function createPyramidMeshIcon() {
  const group = new THREE.Group()
  const vertices = [
    new THREE.Vector3(-0.68, -0.46, 0.48),
    new THREE.Vector3(0.68, -0.46, 0.48),
    new THREE.Vector3(0.68, -0.46, -0.48),
    new THREE.Vector3(-0.68, -0.46, -0.48),
    new THREE.Vector3(0, 0.68, 0.12),
  ]
  const geometry = new THREE.BufferGeometry().setFromPoints(vertices)

  geometry.setIndex([
    0, 1, 2,
    0, 2, 3,
    0, 1, 4,
    1, 2, 4,
    2, 3, 4,
    3, 0, 4,
  ])
  geometry.computeVertexNormals()

  const material = new THREE.MeshStandardMaterial({
    color: 0xffc65a,
    transparent: true,
    opacity: 0.64,
    metalness: 0.02,
    roughness: 0.42,
    side: THREE.DoubleSide,
  })
  const pyramid = new THREE.Mesh(geometry, material)
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry),
    new THREE.LineBasicMaterial({ color: 0x050505, depthTest: false })
  )
  const heightLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -0.46, 0),
      vertices[4],
    ]),
    new THREE.LineDashedMaterial({
      color: 0x050505,
      dashSize: 0.08,
      gapSize: 0.05,
      depthTest: false,
    })
  )

  heightLine.computeLineDistances()
  group.add(pyramid, edges, heightLine)
  vertices.forEach((vertex, index) => {
    const isBlue = index === 0 || index === 1
    const isPurple = index === 4
    const color = isBlue ? CONTROL_POINT_BLUE : isPurple ? CONTROL_POINT_PURPLE : CONTROL_POINT_GRAY
    const emissive = isBlue ? CONTROL_POINT_BLUE_EMISSIVE : isPurple ? CONTROL_POINT_PURPLE_EMISSIVE : CONTROL_POINT_GRAY_EMISSIVE

    group.add(createPoint(vertex, color, emissive, isPurple ? 0.16 : 0.14))
  })

  group.rotation.x = THREE.MathUtils.degToRad(-20)
  group.rotation.y = THREE.MathUtils.degToRad(-38)
  group.rotation.z = THREE.MathUtils.degToRad(-6)

  return group
}

function createLineMeshIcon() {
  const group = new THREE.Group()
  const body = createCylinderBetweenPoints(new THREE.Vector3(-0.81, 0, 0), new THREE.Vector3(0.81, 0, 0), 0.08)
  const leftArrowHead = createConeArrowHead(-1)
  const rightArrowHead = createConeArrowHead(1)

  leftArrowHead.position.x = -1.03
  rightArrowHead.position.x = 1.03
  group.rotation.z = THREE.MathUtils.degToRad(-18)
  group.add(body, leftArrowHead, rightArrowHead)

  return group
}

function createCylinderMeshIcon() {
  const group = new THREE.Group()
  const radius = 0.46
  const bottomY = -0.58
  const topY = 0.58
  const geometry = new THREE.CylinderGeometry(radius, radius, topY - bottomY, 48, 1, false)
  const material = new THREE.MeshStandardMaterial({
    color: 0x9fd3ff,
    transparent: true,
    opacity: 0.5,
    metalness: 0.02,
    roughness: 0.38,
    side: THREE.DoubleSide,
  })
  const cylinder = new THREE.Mesh(geometry, material)
  const sideEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry),
    new THREE.LineBasicMaterial({ color: 0x050505, depthTest: false })
  )
  const bottomCenter = new THREE.Vector3(0, bottomY, 0)
  const topCenter = new THREE.Vector3(0, topY, 0)

  group.add(
    cylinder,
    sideEdges,
    createCircleTube(bottomCenter, radius),
    createCircleTube(topCenter, radius),
    createDashedLine(bottomCenter, topCenter),
    createPoint(bottomCenter, CONTROL_POINT_BLUE, CONTROL_POINT_BLUE_EMISSIVE, 0.14),
    createPoint(new THREE.Vector3(radius, bottomY, 0), CONTROL_POINT_BLUE, CONTROL_POINT_BLUE_EMISSIVE, 0.14),
    createPoint(topCenter, CONTROL_POINT_PURPLE, CONTROL_POINT_PURPLE_EMISSIVE, 0.16)
  )

  group.rotation.x = THREE.MathUtils.degToRad(-18)
  group.rotation.y = THREE.MathUtils.degToRad(32)
  group.rotation.z = THREE.MathUtils.degToRad(-8)

  return group
}

function createConeMeshIcon() {
  const group = new THREE.Group()
  const radius = 0.5
  const bottomY = -0.58
  const topY = 0.62
  const height = topY - bottomY
  const geometry = new THREE.ConeGeometry(radius, height, 48, 1, false)
  const material = new THREE.MeshStandardMaterial({
    color: 0xffc65a,
    transparent: true,
    opacity: 0.58,
    metalness: 0.02,
    roughness: 0.42,
    side: THREE.DoubleSide,
  })
  const cone = new THREE.Mesh(geometry, material)
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry),
    new THREE.LineBasicMaterial({ color: 0x050505, depthTest: false })
  )
  const baseCenter = new THREE.Vector3(0, bottomY, 0)
  const apex = new THREE.Vector3(0, topY, 0)

  cone.position.y = (topY + bottomY) / 2
  edges.position.copy(cone.position)

  group.add(
    cone,
    edges,
    createCircleLine(baseCenter, radius),
    createDashedLine(baseCenter, apex),
    createPoint(baseCenter, CONTROL_POINT_BLUE, CONTROL_POINT_BLUE_EMISSIVE, 0.14),
    createPoint(new THREE.Vector3(radius, bottomY, 0), CONTROL_POINT_BLUE, CONTROL_POINT_BLUE_EMISSIVE, 0.14),
    createPoint(apex, CONTROL_POINT_PURPLE, CONTROL_POINT_PURPLE_EMISSIVE, 0.16)
  )

  group.rotation.x = THREE.MathUtils.degToRad(-18)
  group.rotation.y = THREE.MathUtils.degToRad(32)
  group.rotation.z = THREE.MathUtils.degToRad(-8)

  return group
}

function createCylinderBetweenPoints(start: THREE.Vector3, end: THREE.Vector3, radius: number) {
  const direction = new THREE.Vector3().subVectors(end, start)
  const geometry = new THREE.CylinderGeometry(radius, radius, direction.length(), 24, 1)
  const material = new THREE.MeshStandardMaterial({
    color: 0x050505,
    metalness: 0.15,
    roughness: 0.34,
  })
  const cylinder = new THREE.Mesh(geometry, material)

  cylinder.position.copy(start).add(end).multiplyScalar(0.5)
  cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize())

  return cylinder
}

function createCircleLine(center: THREE.Vector3, radius: number) {
  const points: THREE.Vector3[] = []
  const segments = 64

  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        center.y,
        Math.sin(angle) * radius
      )
    )
  }

  return new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({ color: 0x050505, depthTest: false })
  )
}

function createCircleTube(center: THREE.Vector3, radius: number) {
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(radius, 0.018, 8, 64),
    new THREE.MeshBasicMaterial({
      color: 0x050505,
      depthTest: false,
    })
  )

  ring.position.copy(center)
  ring.rotation.x = Math.PI / 2
  ring.renderOrder = 8

  return ring
}

function createDashedLine(start: THREE.Vector3, end: THREE.Vector3) {
  const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([start, end]),
    new THREE.LineDashedMaterial({
      color: 0x050505,
      dashSize: 0.08,
      gapSize: 0.05,
      depthTest: false,
    })
  )

  line.computeLineDistances()
  line.renderOrder = 9

  return line
}

function createPoint(position: THREE.Vector3, color: number, emissive: number, radius = 0.19) {
  const geometry = new THREE.SphereGeometry(radius, 32, 18)
  const material = new THREE.MeshStandardMaterial({
    color,
    emissive,
    emissiveIntensity: 0.18,
    metalness: 0.05,
    roughness: 0.28,
    depthTest: false,
  })
  const sphere = new THREE.Mesh(geometry, material)

  sphere.position.copy(position)
  sphere.renderOrder = 10

  return sphere
}

function createConeArrowHead(direction: -1 | 1) {
  const geometry = new THREE.ConeGeometry(0.21, 0.52, 32, 1)
  const material = new THREE.MeshStandardMaterial({
    color: CONTROL_POINT_BLUE,
    emissive: CONTROL_POINT_BLUE_EMISSIVE,
    emissiveIntensity: 0.2,
    metalness: 0.08,
    roughness: 0.3,
  })
  const cone = new THREE.Mesh(geometry, material)

  cone.rotation.z = direction === 1 ? -Math.PI / 2 : Math.PI / 2

  return cone
}

function updateRotateMenuItems(items: RotateMenuItem[], rotation: number) {
  const centerItem = items[0]
  const orbitItems = items.slice(1)

  centerItem.element.className = "rotateMenuCenterItem"
  centerItem.placement = "center"

  orbitItems.forEach((item, i) => {
    item.placement = "orbit"
    item.element.className = "rotateMenuOrbitItem"

    const angle = (i / orbitItems.length) * Math.PI * 2 - Math.PI / 2 + rotation
    const x = Math.cos(angle) * 92
    const y = Math.sin(angle) * 58
    const depth = Math.round(y + 100)

    item.element.style.setProperty("--orbit-x", `${x.toFixed(2)}px`)
    item.element.style.setProperty("--orbit-y", `${y.toFixed(2)}px`)
    item.element.style.zIndex = depth.toString()
  })
}

function getOrbitElements(items: RotateMenuItem[]) {
  return items.slice(1).map((item) => item.element)
}

function attachRotateMenuTooltip(container: HTMLElement, items: RotateMenuItem[]) {
  const tooltip = document.createElement("div")
  tooltip.className = "rotateMenuTooltip"
  document.body.appendChild(tooltip)

  const hideTooltip = () => {
    tooltip.classList.remove("visible")
  }

  container.addEventListener("pointermove", (event) => {
    const hit = getRotateMenuTooltipHit(event, items)

    if (!hit) {
      hideTooltip()
      return
    }

    tooltip.textContent = ROTATE_MENU_TOOL_LABELS[hit.tool] ?? hit.tool
    tooltip.style.left = `${event.clientX + 10}px`
    tooltip.style.top = `${event.clientY + 12}px`
    tooltip.classList.add("visible")
  })

  container.addEventListener("pointerleave", hideTooltip)
  container.addEventListener("pointerdown", hideTooltip)
}

function getRotateMenuTooltipHit(event: PointerEvent, items: RotateMenuItem[]) {
  let closest: { item: RotateMenuItem; distance: number } | null = null

  for (const item of items) {
    const icon = item.element.querySelector<HTMLElement>(".rotateMenuToolIcon")
    if (!icon) continue

    const rect = icon.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = event.clientX - centerX
    const dy = event.clientY - centerY
    const radiusX = Math.max(12, rect.width * 0.42)
    const radiusY = Math.max(12, rect.height * 0.42)
    const normalizedDistance = (dx * dx) / (radiusX * radiusX) + (dy * dy) / (radiusY * radiusY)

    if (normalizedDistance > 1) continue

    if (!closest || normalizedDistance < closest.distance) {
      closest = { item, distance: normalizedDistance }
    }
  }

  return closest?.item ?? null
}

function makeOrbitDraggable(
  container: HTMLElement,
  handles: HTMLElement[],
  onRotate: (rotation: number) => void
) {
  let isDragging = false
  let startPointerAngle = 0
  let startRotation = 0
  let currentRotation = 0
  let lastRotation = 0
  let lastMoveTime = 0
  let velocity = 0
  let inertiaFrame = 0

  handles.forEach((handle) => {
    handle.addEventListener("pointerdown", (event) => {
      event.preventDefault()
      event.stopPropagation()

      cancelAnimationFrame(inertiaFrame)
      isDragging = true
      startPointerAngle = getPointerAngle(container, event)
      startRotation = currentRotation
      lastRotation = currentRotation
      lastMoveTime = performance.now()
      velocity = 0

      handle.setPointerCapture(event.pointerId)
    })

    handle.addEventListener("pointermove", (event) => {
      if (!isDragging) return

      event.preventDefault()
      event.stopPropagation()

      currentRotation = startRotation + getPointerAngle(container, event) - startPointerAngle
      const now = performance.now()
      const dt = Math.max(16, now - lastMoveTime)

      velocity = (currentRotation - lastRotation) / dt
      lastRotation = currentRotation
      lastMoveTime = now
      onRotate(currentRotation)
    })

    handle.addEventListener("pointerup", (event) => {
      if (!isDragging) return

      event.preventDefault()
      event.stopPropagation()

      isDragging = false
      handle.releasePointerCapture(event.pointerId)
      inertiaFrame = startOrbitInertia(
        () => currentRotation,
        (rotation) => {
          currentRotation = rotation
          onRotate(currentRotation)
        },
        velocity
      )
    })

    handle.addEventListener("pointercancel", (event) => {
      if (!isDragging) return

      event.preventDefault()
      event.stopPropagation()

      isDragging = false
      handle.releasePointerCapture(event.pointerId)
      inertiaFrame = startOrbitInertia(
        () => currentRotation,
        (rotation) => {
          currentRotation = rotation
          onRotate(currentRotation)
        },
        velocity
      )
    })
  })
}

function startOrbitInertia(
  getRotation: () => number,
  setRotation: (rotation: number) => void,
  initialVelocity: number
) {
  let velocity = initialVelocity
  let lastTime = performance.now()
  let frame = 0

  const step = (time: number) => {
    const dt = Math.min(32, time - lastTime)

    lastTime = time
    velocity *= 0.94

    if (Math.abs(velocity) < 0.00003) return

    setRotation(getRotation() + velocity * dt)
    frame = requestAnimationFrame(step)
  }

  frame = requestAnimationFrame(step)

  return frame
}

function getPointerAngle(container: HTMLElement, event: PointerEvent) {
  const rect = container.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  return Math.atan2(event.clientY - centerY, event.clientX - centerX)
}

function makeRotateMenuDraggable(
  container: HTMLElement,
  handle: HTMLElement
) {
  let isDragging = false
  let dragOffsetX = 0
  let dragOffsetY = 0

  handle.addEventListener("pointerdown", (event) => {
    event.preventDefault()
    event.stopPropagation()

    const rect = container.getBoundingClientRect()

    isDragging = true
    dragOffsetX = event.clientX - rect.left
    dragOffsetY = event.clientY - rect.top

    container.style.left = `${rect.left}px`
    container.style.top = `${rect.top}px`
    container.style.transform = "none"

    handle.setPointerCapture(event.pointerId)
  })

  handle.addEventListener("pointermove", (event) => {
    if (!isDragging) return

    event.preventDefault()
    event.stopPropagation()

    container.style.left = `${event.clientX - dragOffsetX}px`
    container.style.top = `${event.clientY - dragOffsetY}px`
  })

  handle.addEventListener("pointerup", (event) => {
    if (!isDragging) return

    event.preventDefault()
    event.stopPropagation()

    isDragging = false
    saveRotateMenuPosition(container)
    handle.releasePointerCapture(event.pointerId)
  })

  handle.addEventListener("pointercancel", (event) => {
    if (!isDragging) return

    event.preventDefault()
    event.stopPropagation()

    isDragging = false
    saveRotateMenuPosition(container)
    handle.releasePointerCapture(event.pointerId)
  })
}

function saveRotateMenuPosition(container: HTMLElement) {
  const rect = container.getBoundingClientRect()

  localStorage.setItem(
    "geomatik3d.rotateMenu.position",
    JSON.stringify({
      x: rect.left,
      y: rect.top,
    })
  )
}

function loadRotateMenuPosition() {
  const value = localStorage.getItem("geomatik3d.rotateMenu.position")

  if (!value) return null

  try {
    const position = JSON.parse(value) as { x: number; y: number }

    if (
      Number.isFinite(position.x) &&
      Number.isFinite(position.y)
    ) {
      return position
    }
  } catch {
    return null
  }

  return null
}
