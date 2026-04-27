import { BaseTool } from "./BaseTool"

export class ToolManager {
  activeTool: BaseTool | null = null

  setTool(tool: BaseTool) {
    if (this.activeTool) {
      this.activeTool.deactivate()
    }

    this.activeTool = tool

    if (this.activeTool) {
      this.activeTool.activate()
    }
  }

  onMouseMove(event: MouseEvent) {
    this.activeTool?.onMouseMove(event)
  }

  onClick(event: MouseEvent) {
    this.activeTool?.onClick(event)
  }

  onMouseDown(event: MouseEvent) {
    this.activeTool?.onMouseDown?.(event)
  }

  onMouseUp(event: MouseEvent) {
    this.activeTool?.onMouseUp?.(event)
  }
  onKeyDown(event: KeyboardEvent) {
    this.activeTool?.onKeyDown(event)
  }
}