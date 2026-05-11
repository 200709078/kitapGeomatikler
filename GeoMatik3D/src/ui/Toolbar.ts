import handIcon from "../assets/hand.svg"
import pointIcon from "../assets/point.svg"
import lineIcon from "../assets/line.svg"
import lineSegmentIcon from "../assets/linesegment.svg"
import rayIcon from "../assets/ray.svg"
import angleIcon from "../assets/angle.svg"
import planeIcon from "../assets/plane.svg"
import prismIcon from "../assets/prism.svg"
import pyramidIcon from "../assets/pyramid.svg"
import sphereIcon from "../assets/sphere.svg"
import cylinderIcon from "../assets/cylinder.svg"
import coneIcon from "../assets/cone.svg"
import deleteIcon from "../assets/delete.svg"
import visibilityIcon from "../assets/visibility.svg"
import undoIcon from "../assets/undo.svg"
import redoIcon from "../assets/redo.svg"

type ToolName = "select" | "point" | "lineSegment" | "ray" | "plane" | "angle" | "line" | "sphere" | "prism" | "pyramid" | "cylinder" | "cone" | "togglePlane"

export function createToolbar(onToolSelect: (toolName: ToolName) => void) {
  const toolbar = document.createElement("div")
  toolbar.id = "toolbar"

  toolbar.innerHTML = `
  <button data-tool="select" title="Seçme/Taşıma">
  <img src="${handIcon}" alt="Seçme/Taşıma" class="toolbar-icon" />
  </button>

  <button data-tool="point" title="Nokta">
  <img src="${pointIcon}" alt="Nokta" class="toolbar-icon" />
  </button>

  <button data-tool="line" title="Doğru">
  <img src="${lineIcon}" alt="Doğru" class="toolbar-icon" />
  </button>

  <button data-tool="lineSegment" title="Doğru Parçası">
  <img src="${lineSegmentIcon}" alt="Doğru Parçası" class="toolbar-icon" />
  </button>

  <button data-tool="ray" title="Işın">
  <img src="${rayIcon}" alt="Işın" class="toolbar-icon" />
  </button>

  <button data-tool="angle" title="Açı">
  <img src="${angleIcon}" alt="Açı" class="toolbar-icon" />
  </button>

  <button data-tool="plane" title="Düzlem">
  <img src="${planeIcon}" alt="Düzlem" class="toolbar-icon" />
  </button>

  <button data-tool="sphere" title="Küre">
  <img src="${sphereIcon}" alt="Küre" class="toolbar-icon" />
  </button>

  <button data-tool="prism" title="Prizma">
  <img src="${prismIcon}" alt="Prizma" class="toolbar-icon" />
  </button>

  <button data-tool="pyramid" title="Piramit">
  <img src="${pyramidIcon}" alt="Piramit" class="toolbar-icon" />
  </button>

  <button data-tool="cylinder" title="Silindir">
  <img src="${cylinderIcon}" alt="Silindir" class="toolbar-icon" />
  </button>

  <button data-tool="cone" title="Koni">
  <img src="${coneIcon}" alt="Koni" class="toolbar-icon" />
  </button>
  `
  toolbar.querySelectorAll<HTMLButtonElement>("button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault()
      event.stopPropagation()

      const toolName = button.dataset.tool as ToolName

      toolbar
        .querySelectorAll<HTMLButtonElement>("button")
        .forEach((btn) => btn.classList.remove("active"))

      button.classList.add("active")
      button.blur()

      onToolSelect(toolName)
    })
  })

  toolbar.addEventListener("pointerdown", (event) => {
    event.stopPropagation()
  })

  toolbar.addEventListener("mousedown", (event) => {
    event.stopPropagation()
  })

  toolbar.addEventListener("click", (event) => {
    event.stopPropagation()
  })
  document.body.appendChild(toolbar)
  const defaultButton = toolbar.querySelector<HTMLButtonElement>(
    'button[data-tool="select"]'
  )
  defaultButton?.classList.add("active")
  document.body.style.cursor = "default"

  const rightActionToolbar = document.createElement("div")
  rightActionToolbar.id = "rightActionToolbar"
  rightActionToolbar.innerHTML = `
    <button id="toggleButton" data-tool="togglePlane" title="Düzlemi Göster/Gizle">
      <img id="planeToggleIcon" src="${planeIcon}" alt="Düzlemi Göster/Gizle" class="toolbar-icon" />
    </button>

    <button id="undoButton" type="button" title="Geri Al" disabled>
      <img src="${undoIcon}" alt="Geri Al" class="toolbar-icon" />
    </button>

    <button id="redoButton" type="button" title="Yinele" disabled>
      <img src="${redoIcon}" alt="Yinele" class="toolbar-icon" />
    </button>

    <button id="deleteButton" type="button" title="Sil" disabled>
      <img src="${deleteIcon}" alt="Sil" class="delete-icon" />
    </button>

    <button id="showButton" type="button" title="Tümünü Göster" disabled>
      <img src="${visibilityIcon}" alt="Tümünü Göster" class="toolbar-icon" />
    </button>

    <button id="hideButton" type="button" title="Gizle" disabled>
      <img src="${visibilityIcon}" alt="Gizle" class="toolbar-icon" />
    </button>
  `

  const toggleButton = rightActionToolbar.querySelector<HTMLButtonElement>(
    'button[data-tool="togglePlane"]'
  )

  toggleButton?.addEventListener("click", (event) => {
    event.preventDefault()
    event.stopPropagation()
    onToolSelect("togglePlane")
  })

  rightActionToolbar.addEventListener("pointerdown", (event) => {
    event.stopPropagation()
  })

  rightActionToolbar.addEventListener("mousedown", (event) => {
    event.stopPropagation()
  })

  rightActionToolbar.addEventListener("click", (event) => {
    event.stopPropagation()
  })

  document.body.appendChild(rightActionToolbar)

  return toolbar
}
