type ToolName = "select" | "point" | "lineSegment" | "ray" | "plane" | "angle" | "line" | "sphere" | "prism" | "pyramid" | "cylinder" | "cone" | "unfold" | "togglePlane"

export function createToolbar(onToolSelect: (toolName: ToolName) => void) {
  const toolbar = document.createElement("div")
  toolbar.id = "toolbar"

  toolbar.innerHTML = `
    <button data-tool="select" title="Seçme/Taşıma">☝</button>
    <button data-tool="point" title="Nokta">●</button>
    <button data-tool="lineSegment" title="Doğru Parçası">━</button>
    <button data-tool="line" title="Doğru">&harr;</button>
    <button data-tool="ray" title="Yarı Doğru">→</button>
    <button data-tool="angle" title="Açı">∠</button>
    <button data-tool="plane" title="Düzlem">▱</button>
    <button data-tool="sphere" title="Küre">◯</button>
    <button data-tool="prism" title="Prizma">⬛</button>
    <button data-tool="pyramid" title="Piramit">&#9650;</button>
    <button data-tool="cylinder" title="Silindir">&#9711;</button>
    <button data-tool="cone" title="Koni">&#9651;</button>
    <button data-tool="unfold" title="Açınım">&#9635;</button>
  `
  toolbar.querySelectorAll<HTMLButtonElement>("button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault()
      event.stopPropagation()

      const toolName = button.dataset.tool as ToolName

      if (toolName === "unfold") {
        onToolSelect(toolName)
        return
      }

      toolbar
        .querySelectorAll<HTMLButtonElement>("button")
        .forEach((btn) => btn.classList.remove("active"))

      button.classList.add("active")

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

  const planeToggleControl = document.createElement("div")
  planeToggleControl.id = "planeToggleControl"
  planeToggleControl.innerHTML = `
    <button data-tool="togglePlane" title="Düzlemi Göster/Gizle">⬜</button>
  `

  const planeToggleButton = planeToggleControl.querySelector<HTMLButtonElement>(
    'button[data-tool="togglePlane"]'
  )

  planeToggleButton?.addEventListener("click", (event) => {
    event.preventDefault()
    event.stopPropagation()
    onToolSelect("togglePlane")
  })

  planeToggleControl.addEventListener("pointerdown", (event) => {
    event.stopPropagation()
  })

  planeToggleControl.addEventListener("mousedown", (event) => {
    event.stopPropagation()
  })

  planeToggleControl.addEventListener("click", (event) => {
    event.stopPropagation()
  })

  document.body.appendChild(planeToggleControl)

  const deleteSelectionControl = document.createElement("div")
  deleteSelectionControl.id = "deleteSelectionControl"
  deleteSelectionControl.innerHTML = `
    <button title="Sil">×</button>
  `

  deleteSelectionControl.addEventListener("pointerdown", (event) => {
    event.stopPropagation()
  })

  deleteSelectionControl.addEventListener("mousedown", (event) => {
    event.stopPropagation()
  })

  deleteSelectionControl.addEventListener("click", (event) => {
    event.stopPropagation()
  })

  document.body.appendChild(deleteSelectionControl)

  return toolbar
}
