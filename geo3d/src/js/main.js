import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let startPosition = -20;
let endPosition = 20;
camera.position.set(startPosition, 5, 10);
camera.lookAt(startPosition, 0.5, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 0.7);
light.position.set(5, 10, 5);
light.castShadow = true;
light.shadow.mapSize.width = 4096;
light.shadow.mapSize.height = 4096;
light.shadow.camera.near = 1;
light.shadow.camera.far = 50;
light.shadow.camera.left = -30;
light.shadow.camera.right = 30;
light.shadow.camera.top = 20;
light.shadow.camera.bottom = -10;
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.3);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 50),
  new THREE.MeshStandardMaterial({ color: 0xdddddd })
);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.set(startPosition, 0.5, 0);
controls.update();

const cubeSize = 1;
let currentRow = 0;
let nextCount = 3;

const baseColors = [
  0x0077ff,
  0xff7744,
  0x44aa44,
  0xaa44ff,
  0xffff44,
  0x00cccc
];

function shadeColor(color, percent) {
  const f = parseInt(color.toString(16).padStart(6, "0"), 16);
  const t = percent < 0 ? 0 : 255;
  const p = percent < 0 ? percent * -1 : percent;
  const R = f >> 16;
  const G = (f >> 8) & 0x00ff;
  const B = f & 0x0000ff;
  return (
    (0x1000000 +
      (Math.round((t - R) * p) + R) * 0x10000 +
      (Math.round((t - G) * p) + G) * 0x100 +
      (Math.round((t - B) * p) + B))
      .toString(16)
      .slice(1)
  );
}

function createCube(x, y, z, color) {
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize),
    new THREE.MeshStandardMaterial({ color, side: THREE.FrontSide })
  );
  cube.castShadow = true;
  const edges = new THREE.EdgesGeometry(cube.geometry);
  const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
  const group = new THREE.Group();
  cube.position.set(0, 0, 0);
  line.position.set(0, 0, 0);
  group.add(cube);
  group.add(line);
  group.position.set(x, y, z);
  scene.add(group);
  return group;
}

function createTextSprite(text, x, y, z) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.font = "bold 60px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new THREE.CanvasTexture(canvas);
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(2, 1, 1);
  sprite.position.set(x, y, z);
  scene.add(sprite);
  return sprite;
}

function updateTextSprite(sprite, newText) {
  const canvas = sprite.material.map.image;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.font = "bold 60px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(newText, canvas.width / 2, canvas.height / 2);
  sprite.material.map.needsUpdate = true;
}

function setCameraPosition() {
  camera.position.x = startPosition //+ currentRow * (cubeSize + 1) + 5;
  camera.position.y = Math.max(5, nextCount * 0.6);
  camera.position.z = 10 + currentRow;
  controls.target.set(startPosition, nextCount / 2, 0);
  controls.update();
}

let rows = [];
let rowTexts = [];
let ticker = 0;
rows[0] = [createCube(startPosition, cubeSize / 2, 0, 0x0077ff)];
rowTexts[0] = createTextSprite(1, startPosition, cubeSize / 2, 0.7);

function addRows() {
  const nextX = startPosition + (currentRow + 1) * (cubeSize + 1);
  if (nextX > endPosition) return;

  const count = nextCount;
  const baseColor = baseColors[currentRow % baseColors.length];
  rows[currentRow + 1] = [];
  rowTexts[currentRow + 1] = null;

  for (let i = 0; i < count; i++) {
    const percent = (i / count) * 0.6 - 0.3;
    const tonedColor = parseInt(shadeColor(baseColor, percent), 16);
    const cube = createCube(nextX, cubeSize / 2 + i, 0, tonedColor);
    rows[currentRow + 1].push(cube);

    if (i === 0) {
      rowTexts[currentRow + 1] = createTextSprite(count, nextX, cubeSize / 2, 0.7);
    }
  }

  currentRow++;
  nextCount += 2;
  setCameraPosition();
}

let sumText = createTextSprite(null, startPosition, 0.5, 1.25)
sumText.visible = false;
function sumCubes() {
  if (currentRow < 1) return;
  kupEkleBtn.disabled = true;
  rowTexts[0].visible = false;
  updateTextSprite(sumText, (ticker + 2) + '²=' + (ticker + 2) ** 2);
  sumText.position.x += 0.5;
  sumText.visible = true;

  for (let i = ticker + 1; i <= currentRow; i++) {
    rows[i].forEach(cube => {
      cube.position.x -= 1;
    });

    if (rowTexts[i]) {
      if (rows[i][0].position.x <= rows[ticker][0].position.x + cubeSize) {
        rowTexts[i].visible = false;
      } else {
        rowTexts[i].visible = true;
      }
      rowTexts[i].position.x = rows[i][0].position.x;
    }
  }

  ticker++;
  for (let i = rows[ticker].length - 1; ticker < i; i--) {
    rows[ticker][i].position.x -= i - ticker;
    rows[ticker][i].position.y -= i - ticker;
  }
  setCameraPosition();
  if (currentRow == ticker) {
    toplaBtn.disabled = true;
    crushBtn.disabled = false;
    /*     destroyBtn.disabled = false; */
    return;
  }
}

function resetScene() {
  kupEkleBtn.disabled = false;
  toplaBtn.disabled = false;
  crushBtn.disabled = true;
  /*   destroyBtn.disabled = true; */
  sumText.visible = false;
  ticker = 0;
  nextCount = 3;
  currentRow = 0;
  startPosition = -20;
  endPosition = 20;
  sumText.position.x = startPosition + 0.5;
  rows.forEach(row => {
    row.forEach(cube => {
      scene.remove(cube);
    });
  });
  rowTexts.forEach(text => {
    if (text) scene.remove(text);
  });
  rows = [];
  rowTexts = [];
  rows[0] = [createCube(startPosition, cubeSize / 2, 0, 0x0077ff)];
  rowTexts[0] = createTextSprite(1, startPosition, cubeSize / 2, 0.7);
  rowTexts[0].visible = true;
  setCameraPosition();
}

function crushCubes() {
  rows.forEach(row => {
    row.forEach(cube => {
      const randomX = (Math.random() - 0.5) * 40;
      const randomY = Math.random() * 20 + 5;
      const randomZ = (Math.random() - 0.5) * 20;
      cube.position.set(randomX, randomY, randomZ);
      const randomRotX = Math.random() * Math.PI * 2;
      const randomRotY = Math.random() * Math.PI * 2;
      const randomRotZ = Math.random() * Math.PI * 2;
      cube.rotation.set(randomRotX, randomRotY, randomRotZ);
    });
  });
}

function explodeCubes() {
  const duration = 1000; // animasyon süresi (ms)
  const startTime = performance.now();

  // her küp için hedef pozisyon ve rotasyon hesapla
  const cubeStates = [];
  rows.forEach(row => {
    row.forEach(cube => {
      const targetX = (Math.random() - 0.5) * 40;
      const targetY = Math.random() * 20 + 5;
      const targetZ = (Math.random() - 0.5) * 20;
      const targetRotX = Math.random() * Math.PI * 2;
      const targetRotY = Math.random() * Math.PI * 2;
      const targetRotZ = Math.random() * Math.PI * 2;

      cubeStates.push({
        cube,
        startPos: cube.position.clone(),
        targetPos: new THREE.Vector3(targetX, targetY, targetZ),
        startRot: cube.rotation.clone(),
        targetRot: new THREE.Euler(targetRotX, targetRotY, targetRotZ)
      });
    });
  });

  function animateExplosion(time) {
    const elapsed = time - startTime;
    const t = Math.min(elapsed / duration, 1); // 0 → 1 arası

    cubeStates.forEach(state => {
      // pozisyonu interpolate et
      state.cube.position.lerpVectors(state.startPos, state.targetPos, t);

      // rotasyonu interpolate et
      state.cube.rotation.x = state.startRot.x + (state.targetRot.x - state.startRot.x) * t;
      state.cube.rotation.y = state.startRot.y + (state.targetRot.y - state.startRot.y) * t;
      state.cube.rotation.z = state.startRot.z + (state.targetRot.z - state.startRot.z) * t;
    });

    if (t < 1) {
      requestAnimationFrame(animateExplosion);
    }
  }

  requestAnimationFrame(animateExplosion);
}


















/* function destroyCubesWithaBall() {
  console.log('destroy çalıştı')
} 

//add me start
function createFallingStack() {
  const stackGroup = new THREE.Group();
  const stackHeight = 3;
  const startX = 0;
  const startY = 0.5;
  const startZ = 0;
  const cubeSpacing = 1;

  // Üst üste küpler
  for (let i = 0; i < stackHeight; i++) {
    const cube = createCube(0, i * cubeSpacing, 0, 0xff0000);
    stackGroup.add(cube);
  }

  // Grup pozisyonu sahne ortasına
  stackGroup.position.set(startX, startY, startZ);
  scene.add(stackGroup);

  // Bir süre bekle
  setTimeout(() => {
    const duration = 1000; // ms
    const targetAngle = Math.PI / 2; // sola yatma
    const startTime = performance.now();

    function animateStack(time) {
      const elapsed = time - startTime;
      const t = Math.min(elapsed / duration, 1);

      // Grup sola yatıyor, küpler yapışık
      stackGroup.rotation.z = targetAngle * t;

        console.log(stackGroup.rotation)

      if (t < 1) requestAnimationFrame(animateStack);
    }

    requestAnimationFrame(animateStack);
  }, 500); // 0.5 saniye bekle
}

 // denemeBtn ile çağır
const denemeBtn = document.getElementById("denemeBtn");
denemeBtn.addEventListener("click", createFallingStack);
//add me end */

let kupEkleBtn = document.getElementById("kupEkleBtn")
kupEkleBtn.addEventListener("click", addRows);
let toplaBtn = document.getElementById("toplaBtn")
toplaBtn.addEventListener("click", sumCubes);
let resetSceneBtn = document.getElementById("resetSceneBtn")
resetSceneBtn.addEventListener("click", resetScene);
let crushBtn = document.getElementById("crushBtn")
crushBtn.addEventListener("click", explodeCubes);
/* let destroyBtn = document.getElementById("destroyBtn");
destroyBtn.addEventListener("click", destroyCubesWithaBall); */

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});