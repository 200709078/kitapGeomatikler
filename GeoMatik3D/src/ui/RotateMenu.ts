type RotateMenuSphere = {
  element: HTMLElement
  placement: "center" | "orbit"
}

export function createRotateMenu() {
  const savedPosition = loadRotateMenuPosition()
  const container = document.createElement("div")
  container.id = "rotateMenu"
  const toolsArr: RotateMenuSphere[] = []
  let orbitRotation = 0

  if (savedPosition) {
    container.style.left = `${savedPosition.x}px`
    container.style.top = `${savedPosition.y}px`
    container.style.transform = "none"
  }

  const sphere = document.createElement("div")
  sphere.id = "rotateMenuSphere"
  sphere.innerHTML = `
    <div id="rotateMenuCenterPyramid"></div>
  `

  toolsArr.push({
    element: sphere,
    placement: "center",
  })
  container.appendChild(sphere)

  for (let i = 0; i < 12; i++) {
    const orbitSphere = document.createElement("div")

    orbitSphere.className = "rotateMenuOrbitSphere"
    orbitSphere.style.setProperty("--orbit-hue", randomHue())
    toolsArr.push({
      element: orbitSphere,
      placement: "orbit",
    })
    container.appendChild(orbitSphere)
  }

  updateRotateMenuSpheres(toolsArr, orbitRotation)
  document.body.appendChild(container)
  makeRotateMenuDraggable(container, toolsArr[0].element)
  makeOrbitDraggable(container, getOrbitElements(toolsArr), (rotation) => {
    orbitRotation = rotation
    updateRotateMenuSpheres(toolsArr, orbitRotation)
  })

  return container
}

function updateRotateMenuSpheres(spheres: RotateMenuSphere[], rotation: number) {
  const centerSphere = spheres[0]
  const orbitSpheres = spheres.slice(1)

  centerSphere.element.id = "rotateMenuSphere"
  centerSphere.element.className = ""
  centerSphere.placement = "center"

  orbitSpheres.forEach((sphere, i) => {
    sphere.placement = "orbit"
    sphere.element.className = "rotateMenuOrbitSphere"

    const angle = (i / orbitSpheres.length) * Math.PI * 2 - Math.PI / 2 + rotation
    const x = Math.cos(angle) * 46
    const y = Math.sin(angle) * 29
    const depth = Math.round(y + 100)

    sphere.element.style.setProperty("--orbit-x", `${x.toFixed(2)}px`)
    sphere.element.style.setProperty("--orbit-y", `${y.toFixed(2)}px`)
    sphere.element.style.zIndex = depth.toString()
  })
}

function getOrbitElements(spheres: RotateMenuSphere[]) {
  return spheres.slice(1).map((sphere) => sphere.element)
}

function randomHue() {
  return Math.floor(Math.random() * 360).toString()
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
