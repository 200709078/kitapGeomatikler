import { BaseTool } from "./BaseTool"

export class ToolManager {
  activeTool: BaseTool | null = null

  setTool(tool: BaseTool) {
    if (this.activeTool) {
      this.activeTool.deactivate()
    }

    this.activeTool = tool
    this.activeTool.activate()
  }

  onMouseMove(event: MouseEvent) {
    if (!this.activeTool) return
    this.activeTool.onMouseMove(event)
  }

  onClick(event: MouseEvent) {
    if (!this.activeTool) return
    this.activeTool.onClick(event)
  }

  onMouseDown(event: MouseEvent) {
    if (!this.activeTool) return
    this.activeTool.onMouseDown(event)
  }

  onMouseUp(event: MouseEvent) {
    if (!this.activeTool) return
    this.activeTool.onMouseUp(event)
  }

  onKeyDown(event: KeyboardEvent) {
    if (!this.activeTool) return
    this.activeTool.onKeyDown(event)
  }

  onDoubleClick(event: MouseEvent) {
    if (!this.activeTool) return
    this.activeTool.onDoubleClick?.(event)
  }
}