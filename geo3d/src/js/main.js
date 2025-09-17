import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// SAHNE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

// KAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Başlangıç pozisyonu
const startPosition = -20; // ilk küpün X konumu
const endPosition = 20;    // zeminin en sağ sınırı
camera.position.set(startPosition + 5, 5, 10);
camera.lookAt(startPosition, 0.5, 0);

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// IŞIK
const light = new THREE.DirectionalLight(0xffffff, 0.7);
light.position.set(5, 10, 5);
light.castShadow = true;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 1;
light.shadow.camera.far = 50;
light.shadow.camera.left = -10;
light.shadow.camera.right = 10;
light.shadow.camera.top = 10;
light.shadow.camera.bottom = -10;
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.3);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

// ZEMİN
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 50),
  new THREE.MeshStandardMaterial({ color: 0xdddddd })
);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

// ORBIT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.set(startPosition, 0.5, 0);
controls.update();

// --- KÜP ve TEK SAYILARLA İLGİLİ VERİLER ---
const cubeSize = 1;
let currentRow = 0;    // sıra indeksi (ilk eklenen sıra)
let nextCount = 3;     // ilk tıklamada 3 küp eklenecek

// Farklı renk paleti
const baseColors = [
  0x0077ff, // mavi
  0xff7744, // turuncu
  0x44aa44, // yeşil
  0xaa44ff, // mor
  0xffff44, // sarı
  0x00cccc  // camgöbeği
];

// Renk tonunu ayarlayan fonksiyon
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

// Küp oluşturma fonksiyonu (kenar çizgileri ile)
function createCube(x, y, z, color) {
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize),
    new THREE.MeshStandardMaterial({ color })
  );
  cube.position.set(x, y, z);
  cube.castShadow = true;
  scene.add(cube);

  // Kenarlar
  const edges = new THREE.EdgesGeometry(cube.geometry);
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0x000000 })
  );
  line.position.copy(cube.position);
  scene.add(line);

  return cube;
}

// İlk küp
createCube(startPosition, cubeSize / 2, 0, 0x0077ff);

// Küp ekleme fonksiyonu
function addRow() {
  const nextX = startPosition + (currentRow + 1) * (cubeSize + 1);

  // Sınır kontrolü
  if (nextX > endPosition) {
    //alert("Artık yeni küp eklenemez!");
    return;
  }

  const count = nextCount;
  const baseColor = baseColors[currentRow % baseColors.length];

  for (let i = 0; i < count; i++) {
    const percent = (i / count) * 0.6 - 0.3;
    const tonedColor = parseInt(shadeColor(baseColor, percent), 16);
    createCube(
      nextX,
      cubeSize / 2 + i,
      0,
      tonedColor
    );
  }

  currentRow++;
  nextCount += 2;

  // Kamera: başlangıç pozisyonundan itibaren sağa kaydır
  camera.position.x = nextX + 5;
  camera.position.y = Math.max(5, nextCount * 0.6);
  camera.position.z = Math.max(10, nextCount * 1.2);
  controls.target.set(nextX, nextCount / 2, 0);
  controls.update();
}

// BUTON
document.getElementById("kupEkleBtn").addEventListener("click", addRow);

// ANİMASYON
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// BOYUTLANDIRMA
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
