type ToolName = "select" | "point" | "lineSegment" | "ray" | "angle"

export function createToolbar(onToolSelect: (toolName: ToolName) => void) {
  const toolbar = document.createElement("div")
  toolbar.id = "toolbar"

  toolbar.innerHTML = `
    <button data-tool="select" title="Taşıma">↔</button>
    <button data-tool="point" title="Nokta">●</button>
    <button data-tool="lineSegment" title="Doğru Parçası">━</button>
    <button data-tool="ray" title="Yarı Doğru">→</button>
    <button data-tool="angle" title="Açı">∠</button>
  `
  toolbar.querySelectorAll<HTMLButtonElement>("button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault()
      event.stopPropagation()
      toolbar
        .querySelectorAll<HTMLButtonElement>("button")
        .forEach((btn) => btn.classList.remove("active"))

      button.classList.add("active")

      const toolName = button.dataset.tool as ToolName
      onToolSelect(toolName)

      if (toolName === "select") {
        document.body.style.cursor = "default"
      } else {
        document.body.style.cursor = "crosshair"
      }

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

  return toolbar
}