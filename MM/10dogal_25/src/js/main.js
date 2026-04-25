import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xf0f0f0)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

let startPosition = -20
let endPosition = 20
camera.position.set(startPosition, 5, 10)
camera.lookAt(startPosition, 0.5, 0)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
document.body.appendChild(renderer.domElement)

const light = new THREE.DirectionalLight(0xffffff, 0.7);
light.position.set(5, 10, 5)
light.castShadow = true
light.shadow.mapSize.width = 4096
light.shadow.mapSize.height = 4096
light.shadow.camera.near = 1
light.shadow.camera.far = 50
light.shadow.camera.left = -30
light.shadow.camera.right = 30
light.shadow.camera.top = 20
light.shadow.camera.bottom = -10
scene.add(light)

scene.add(new THREE.AmbientLight(0xffffff, 0.6))
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.3)
hemiLight.position.set(0, 20, 0)
scene.add(hemiLight)

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 50),
  new THREE.MeshStandardMaterial({ color: 0xdddddd }))
plane.rotation.x = -Math.PI / 2
plane.receiveShadow = true
scene.add(plane)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.target.set(startPosition, 0.5, 0)
controls.update()

const cubeSize = 1
let currentCol = 0
let nextCount = 2

function createCube(x, y, z, color) {
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize),
    new THREE.MeshStandardMaterial({ color, side: THREE.FrontSide })
  );
  cube.castShadow = true
  const edges = new THREE.EdgesGeometry(cube.geometry)
  const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }))
  const group = new THREE.Group()
  cube.position.set(0, 0, 0)
  line.position.set(0, 0, 0)
  group.add(cube)
  group.add(line)
  group.position.set(x, y, z)
  scene.add(group)
  return group
}

function createTextSprite(text, x, y, z) {
  const canvas = document.createElement("canvas")
  canvas.width = 256
  canvas.height = 128
  const ctx = canvas.getContext("2d")
  ctx.fillStyle = "white"
  ctx.font = "bold 60px Arial"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)
  const texture = new THREE.CanvasTexture(canvas)
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture })
  const sprite = new THREE.Sprite(spriteMaterial)
  sprite.scale.set(2, 1, 1)
  sprite.position.set(x, y, z)
  scene.add(sprite)
  return sprite
}

function setCameraPosition() {
  camera.position.x = startPosition
  camera.position.y = Math.max(5, nextCount * 0.6)
  camera.position.z = 10 + currentCol
  controls.target.set(startPosition, nextCount / 2, 0)
  controls.update()
}

let ekleCols = []
let toplaCols = []
let ekleTexts = []
let toplaTexts = []
let ticker = 0
ekleCols[0] = [createCube(startPosition, cubeSize / 2, 0, 'blue')]
ekleTexts[0] = createTextSprite(1, startPosition, cubeSize / 2, 0.7)

function addCols() {
  toplaBtn.disabled = false
  const nextX = startPosition + (currentCol) * (cubeSize) + 1
  if (nextX > endPosition) return

  const count = nextCount
  ekleCols[currentCol + 1] = []
  ekleTexts[currentCol + 1] = null

  for (let i = 0; i < count; i++) {
    const percent = (i / count) * 0.6 - 0.3
    const cube = createCube(nextX, cubeSize / 2 + i, 0, 'blue')
    ekleCols[currentCol + 1].push(cube)

    if (i === 0) {
      ekleTexts[currentCol + 1] = createTextSprite(count, nextX, cubeSize / 2, 0.7)
    }
  }

  currentCol++
  nextCount += 1
  setCameraPosition()
}

function dropCube(cube, targetPosition, delay = 0) {
  const startTime = performance.now() + delay
  const startPos = new THREE.Vector3(
    targetPosition.x,
    targetPosition.y + 20,
    targetPosition.z
  )

  cube.position.copy(startPos)
  const duration = 800
  function animate(time) {
    const elapsed = time - startTime
    if (elapsed < 0) {
      requestAnimationFrame(animate)
      return
    }
    const t = Math.min(elapsed / duration, 1)
    const easedT = 1 - Math.pow(1 - t, 3)
    cube.position.y =
      startPos.y + (targetPosition.y - startPos.y) * easedT
    cube.position.x =
      startPos.x + (targetPosition.x - startPos.x) * easedT
    cube.position.z =
      startPos.z + (targetPosition.z - startPos.z) * easedT
    if (t < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

function sumCubes() {
  kupEkleBtn.disabled = true
  explodeBtn.disabled = true
  explodeBtn.disabled = true

  let groupIndex = 0
  for (let i = currentCol; i >= 0; i--) {
    const groupDelay = groupIndex * 200
    for (let j = 0; j <= currentCol - i; j++) {
      const targetCube = createCube(startPosition + i, i + j + 1 + 0.5, 0, 'red')
      toplaCols.push(targetCube)

      const label = createTextSprite(currentCol - i + 1, startPosition + i, currentCol + 1.5, 0.7)
      label.visible = false
      toplaTexts.push(label)

      setTimeout(() => {
        label.visible = true
        if (i == 0) explodeBtn.disabled = false
      }, groupDelay + 800)

      dropCube(targetCube, targetCube.position.clone(), groupDelay)
    }
    groupIndex++
  }

  setCameraPosition()
  toplaBtn.disabled = true
}

function resetScene() {
  kupEkleBtn.disabled = false
  toplaBtn.disabled = false
  explodeBtn.disabled = true
  ticker = 0
  nextCount = 2
  currentCol = 0
  startPosition = -20
  endPosition = 20
  ekleCols.forEach(col => {
    col.forEach(cube => {
      scene.remove(cube)
    })
  })
  toplaCols.forEach(cube => {
    scene.remove(cube)
  })
  ekleTexts.forEach(text => {
    if (text) scene.remove(text)
  });
  toplaTexts.forEach(text => {
    if (text) scene.remove(text)
  });
  ekleCols = []
  ekleTexts = []
  ekleCols[0] = [createCube(startPosition, cubeSize / 2, 0, 0x0077ff)]
  ekleTexts[0] = createTextSprite(1, startPosition, cubeSize / 2, 0.7)
  ekleTexts[0].visible = true
  setCameraPosition()
}

function explodeFunc() {
  ekleTexts.forEach(text => {
    if (text) scene.remove(text)
  })

  toplaTexts.forEach(text => {
    if (text) scene.remove(text)
  })

  explodeCubes(toplaCols)
  ekleCols.forEach(col => {
    col.forEach(cube => {
      explodeCubes(cube)
    })
  })
}

function explodeCubes(cubes) {
  if (!cubes) return
  if (!Array.isArray(cubes)) {
    cubes = [cubes]
  }

  explodeBtn.disabled = true

  const duration = 1000
  const startTime = performance.now()

  const states = cubes.map(cube => ({
    cube,
    startPos: cube.position.clone(),
    targetPos: new THREE.Vector3(
      (Math.random() - 0.5) * 40,
      Math.random() * 20 + 5,
      (Math.random() - 0.5) * 20
    ),
    startRot: cube.rotation.clone(),
    targetRot: new THREE.Euler(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    )
  }))

  function animate(time) {
    const elapsed = time - startTime
    const t = Math.min(elapsed / duration, 1)

    states.forEach(state => {
      state.cube.position.lerpVectors(state.startPos, state.targetPos, t)

      state.cube.rotation.x =
        state.startRot.x + (state.targetRot.x - state.startRot.x) * t
      state.cube.rotation.y =
        state.startRot.y + (state.targetRot.y - state.startRot.y) * t
      state.cube.rotation.z =
        state.startRot.z + (state.targetRot.z - state.startRot.z) * t
    })

    if (t < 1) {
      requestAnimationFrame(animate)
    }
  }
  requestAnimationFrame(animate)
}


let kupEkleBtn = document.getElementById("kupEkleBtn")
kupEkleBtn.addEventListener("click", addCols)
let toplaBtn = document.getElementById("toplaBtn")
toplaBtn.addEventListener("click", sumCubes)
let resetSceneBtn = document.getElementById("resetSceneBtn")
resetSceneBtn.addEventListener("click", resetScene)
let explodeBtn = document.getElementById("explodeBtn")
explodeBtn.addEventListener("click", explodeFunc)

function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}
animate()

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
});