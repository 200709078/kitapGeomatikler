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
import { createGrid } from './engine/Grid'
import { ToolManager } from './tools/ToolManager'
import { createToolbar } from './ui/Toolbar'
import { PointTool } from './tools/PointTool'
import { LineSegmentTool } from './tools/LineSegmentTool'
import { RayTool } from './tools/RayTool'
import { AngleTool } from './tools/AngleTool'
import { SelectTool } from './tools/SelectTool'

const scene = createScene()
const camera = createCamera()
const renderer = createRenderer()
createLighting(scene)
createPlane(scene)
createGrid(scene)

const controls = createControls(camera, renderer)
setupResize(camera, renderer)
createLoop(renderer, scene, camera, controls)

const toolManager = new ToolManager()

const selectableObjects: THREE.Object3D[] = []
const selectTool = new SelectTool(scene, camera, controls)
selectTool.setSelectableObjects(selectableObjects)

const pointTool = new PointTool(scene, camera, selectableObjects)
const lineSegmentTool = new LineSegmentTool(scene, camera, selectableObjects)
const rayTool = new RayTool(scene, camera, selectableObjects)
const angleTool = new AngleTool(scene, camera, selectableObjects)
toolManager.setTool(selectTool)

createToolbar((toolName) => {
  if (toolName === "select") {
    toolManager.setTool(selectTool)
  }

  if (toolName === "point") {
    toolManager.setTool(pointTool)
  }

  if (toolName === "lineSegment") {
    toolManager.setTool(lineSegmentTool)
  }

  if (toolName === "ray") {
    toolManager.setTool(rayTool)
  }

  if (toolName === "angle") {
    toolManager.setTool(angleTool)
  }
})

window.addEventListener("mousemove", (event) => {
  toolManager.onMouseMove(event)
})

window.addEventListener("click", (event) => {
  toolManager.onClick(event)
})
window.addEventListener("mousedown", (event) => {
  toolManager.onMouseDown(event)
})

window.addEventListener("mouseup", (event) => {
  toolManager.onMouseUp(event)
})

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    toolManager.activeTool?.reset()
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