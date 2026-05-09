//rotatemenuyü Sürüklerken hintler gözükmesin.
//Cisimlerin tabanları açık olmasın. yanları gibi olsun.
// Prizma, piramit, silindri seçilrise çalışacak açınım aracı yapılacak. Açınım cismin taban düzlemi üzerine olacak.
// undo redo

import './style.css'
import * as THREE from 'three'
import { createScene } from './core/Scene'
import { createCamera } from './core/Camera'
import { createRenderer } from './core/Renderer'
import { createControls } from './core/Controls'
import { createLoop } from './core/Loop'
import { setupResize } from './core/Resize'
import { createLighting } from './engine/Lighting'
import { createPlane } from './engine/Plane'
import { ToolManager } from './tools/ToolManager'
import { createToolbar } from './ui/Toolbar'
import { createRotateMenu } from './ui/RotateMenu'
import { PointTool } from './tools/PointTool'
import { LineSegmentTool } from './tools/LineSegmentTool'
import { LineTool } from './tools/LineTool'
import { RayTool } from './tools/RayTool'
import { PlaneTool } from './tools/PlaneTool'
import { AngleTool } from './tools/AngleTool'
import { SelectTool } from './tools/SelectTool'
import { SphereTool } from './tools/SphereTool'
import { PrismTool } from './tools/PrismTool'
import { PyramidTool } from './tools/PyramidTool'
import { CylinderTool } from './tools/CylinderTool'
import { ConeTool } from './tools/ConeTool'
import { UnfoldTool } from './tools/UnfoldTool'
import { createGrid } from './engine/Grid'
import type { ToolCompleteOptions } from './tools/BaseTool'

const scene = createScene()
const camera = createCamera()
const renderer = createRenderer()
createLighting(scene)
const plane = createPlane(scene)
createGrid(scene)

const controls = createControls(camera, renderer)
setupResize(camera, renderer)
createLoop(renderer, scene, camera, controls)
createRotateMenu()

const toolManager = new ToolManager()

const selectableObjects: THREE.Object3D[] = []
const selectTool = new SelectTool(scene, camera, controls)
selectTool.setSelectableObjects(selectableObjects)
toolManager.setSelectTool(selectTool)
toolManager.setControls(controls)

const pointTool = new PointTool(scene, camera, selectableObjects)
const lineSegmentTool = new LineSegmentTool(scene, camera, selectableObjects)
const lineTool = new LineTool(scene, camera, selectableObjects)
const rayTool = new RayTool(scene, camera, selectableObjects)
const planeTool = new PlaneTool(scene, camera, selectableObjects)
const angleTool = new AngleTool(scene, camera, selectableObjects)
const sphereTool = new SphereTool(scene, camera, selectableObjects)
const prismTool = new PrismTool(scene, camera, selectableObjects)
const pyramidTool = new PyramidTool(scene, camera, selectableObjects)
const cylinderTool = new CylinderTool(scene, camera, selectableObjects)
const coneTool = new ConeTool(scene, camera, selectableObjects)
const unfoldTool = new UnfoldTool(scene, camera)

const returnToSelectTool = (options?: ToolCompleteOptions) => {
  if (options?.clearSelection !== false) {
    selectTool.clearSelection()
  }

  toolManager.setTool(selectTool)

  document
    .querySelectorAll<HTMLButtonElement>("#toolbar button")
    .forEach((btn) => btn.classList.remove("active"))

  document
    .querySelector<HTMLButtonElement>('#toolbar button[data-tool="select"]')
    ?.classList.add("active")
}

[
  pointTool,
  lineSegmentTool,
  lineTool,
  rayTool,
  planeTool,
  angleTool,
  sphereTool,
  prismTool,
  pyramidTool,
  cylinderTool,
  coneTool,
  unfoldTool,
].forEach((tool) => {
  tool.setCompleteHandler(returnToSelectTool)
  tool.setPointSelectHandler((point) => selectTool.selectPointWithoutHelpers(point))
})

toolManager.setTool(selectTool)

createToolbar((toolName) => {
  if (toolName === "togglePlane") {
    plane.visible = !plane.visible
  }
  if (toolName === "select") {
    toolManager.setTool(selectTool)
  }

  if (toolName === "point") {
    toolManager.setTool(pointTool)
  }

  if (toolName === "lineSegment") {
    toolManager.setTool(lineSegmentTool)
  }
  if (toolName === "line") {
    toolManager.setTool(lineTool)
  }

  if (toolName === "ray") {
    toolManager.setTool(rayTool)
  }
  if (toolName === "plane") {
    toolManager.setTool(planeTool)
  }
  if (toolName === "angle") {
    toolManager.setTool(angleTool)
  }
  if (toolName === "sphere") {
    toolManager.setTool(sphereTool)
  }

  if (toolName === "prism") {
    toolManager.setTool(prismTool)
  }
  if (toolName === "pyramid") {
    toolManager.setTool(pyramidTool)
  }
  if (toolName === "cylinder") {
    toolManager.setTool(cylinderTool)
  }
  if (toolName === "cone") {
    toolManager.setTool(coneTool)
  }
  if (toolName === "unfold") {
    toolManager.setTool(unfoldTool)
  }
})

renderer.domElement.style.touchAction = "none"

renderer.domElement.addEventListener("pointerdown", (event) => {
  const activeTool = toolManager.activeTool
  const shouldToolHandleFirst = activeTool === selectTool
    ? selectTool.shouldHandleBeforeOrbitControls(event)
    : activeTool !== null

  if (shouldToolHandleFirst) {
    toolManager.onPointerDown(event)
    event.preventDefault()
    event.stopImmediatePropagation()
  }
}, { capture: true })

renderer.domElement.addEventListener("pointerdown", (event) => {
  toolManager.onPointerDown(event)
})

renderer.domElement.addEventListener("pointermove", (event) => {
  toolManager.onPointerMove(event)
})

renderer.domElement.addEventListener("pointerup", (event) => {
  toolManager.onPointerUp(event)
})

renderer.domElement.addEventListener("pointercancel", (event) => {
  toolManager.onPointerCancel(event)
})

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    returnToSelectTool()

    return
  }

  toolManager.onKeyDown(event)
})
