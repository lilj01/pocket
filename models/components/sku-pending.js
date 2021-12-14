import {
  Spu
} from "../spu"
import {
  Cell
} from "./cell"

/* 将选择的规格存在该对象 */
class SkuPending {
  pending = []

  constructor() {

  }


  init(sku) {
    const specs = sku.specs
    for (let i = 0; i < specs.length; i++) {
      const cell = new Cell(specs[i])
      this.insertCell(cell, i)
    }
  }

  /* 添加已选的cell，有顺序 */
  insertCell(cell, x) {
    this.pending[x] = cell
  }

  /* 移除已选的cell，有顺序 */
  removeCell(x) {
    this.pending[x] = null
  }

  findSelectedCellByX(x) {
    return this.pending[x]
  }

  isSelected(cell, x) {
    const pendingCell = this.pending[x]
    if (!pendingCell) {
      return false
    }
    return cell.id === pendingCell.id
  }
}

export {
  SkuPending
}