import {
  Cell
} from "./cell"

class Fence {

  /**规格值 一行 */
  cells = []
  specs

  constructor(specs) {
    this.specs = specs
  }

  init() {
    this.specs.forEach(element => {
      const cell = new Cell(element)
      this.cells.push(cell)
    })
  }

}

export {
  Fence
}