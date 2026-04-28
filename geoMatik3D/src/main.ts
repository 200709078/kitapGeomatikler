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
//import { createGrid } from './engine/Grid'
import { ToolManager } from './tools/ToolManager'
import { createToolbar } from './ui/Toolbar'
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
import { createGrid } from './engine/Grid'

const scene = createScene()
const camera = createCamera()
const renderer = createRenderer()
createLighting(scene)
const plane = createPlane(scene)
createGrid(scene)
//const grid = createGrid(scene)

const controls = createControls(camera, renderer)
setupResize(camera, renderer)
createLoop(renderer, scene, camera, controls)

const toolManager = new ToolManager()

const selectableObjects: THREE.Object3D[] = []
const selectTool = new SelectTool(scene, camera, controls)
selectTool.setSelectableObjects(selectableObjects)

const pointTool = new PointTool(scene, camera, selectableObjects)
const lineSegmentTool = new LineSegmentTool(scene, camera, selectableObjects)
const lineTool = new LineTool(scene, camera, selectableObjects)
const rayTool = new RayTool(scene, camera, selectableObjects)
const planeTool = new PlaneTool(scene, camera, selectableObjects)
const angleTool = new AngleTool(scene, camera, selectableObjects)
const sphereTool = new SphereTool(scene, camera, selectableObjects)
const prismTool = new PrismTool(scene, camera, selectableObjects)
const pyramidTool = new PyramidTool(scene, camera, selectableObjects)

toolManager.setTool(selectTool)

createToolbar((toolName) => {
  if (toolName === "togglePlane") {
    plane.visible = !plane.visible
    //grid.visible = !grid.visible
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
})

renderer.domElement.addEventListener("mousemove", (event) => {
  toolManager.onMouseMove(event)
})

renderer.domElement.addEventListener("click", (event) => {
  toolManager.onClick(event)
})

renderer.domElement.addEventListener("mousedown", (event) => {
  toolManager.onMouseDown(event)
})

renderer.domElement.addEventListener("mouseup", (event) => {
  toolManager.onMouseUp(event)
})



renderer.domElement.addEventListener(
  "wheel",
  (event) => {
    if (event.shiftKey) {
      event.preventDefault()
      event.stopPropagation()
      toolManager.onWheel(event)
    }
  },
  { passive: false, capture: true }
)



window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    toolManager.setTool(selectTool)

    document
      .querySelectorAll<HTMLButtonElement>("#toolbar button")
      .forEach((btn) => btn.classList.remove("active"))

    document
      .querySelector<HTMLButtonElement>('#toolbar button[data-tool="select"]')
      ?.classList.add("active")

    document.body.style.cursor = "default"

    return
  }

  toolManager.onKeyDown(event)
})