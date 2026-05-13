import "./RightToolbar.css"

import planeIcon from "../assets/plane.svg"
import deleteIcon from "../assets/delete.svg"
import visibilityIcon from "../assets/visibility.svg"
import undoIcon from "../assets/undo.svg"
import redoIcon from "../assets/redo.svg"

export type RightToolbarActionName = "togglePlane"

export function createRightToolbar(
  onActionSelect: (actionName: RightToolbarActionName) => void
) {
  const rightActionToolbar = document.createElement("div")
  rightActionToolbar.id = "rightActionToolbar"
  rightActionToolbar.className = "right-toolbar"

  rightActionToolbar.innerHTML = `
    <button id="toggleButton" data-action="togglePlane" type="button" title="Düzlemi Göster/Gizle">
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
    'button[data-action="togglePlane"]'
  )

  toggleButton?.addEventListener("click", (event) => {
    event.preventDefault()
    event.stopPropagation()
    onActionSelect("togglePlane")
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

  return rightActionToolbar
}
