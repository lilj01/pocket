import {
  Joiner
} from "../../utils/joiner"
import {
  Spu
} from "../spu"
import {
  Cell
} from "./cell"

/* 将选择的规格存在该对象 */
class SkuPending {
  pending = []
  size

  constructor(size) {
    this.size = size
  }


  init(sku) {
    const specs = sku.specs
    for (let i = 0; i < specs.length; i++) {
      const cell = new Cell(specs[i])
      this.insertCell(cell, i)
    }
  }

  /**获取已经选择的规格值数组 */
  getCurrentSpecValues() {
    const values = this.pending.map(cell => {
      if (cell) {
        return cell ? cell.spec.value : null
      }
    })
    return values
  }

  /**获取缺失的规格名数组 */
  getMissingSpecKeysIndex() {
    const keysIndex = []
    for (let i = 0; i < this.size; i++) {
      if (!this.pending[i]) {
        keysIndex.push(i)
      }
    }
    return keysIndex
  }

  /**获取已选的规格拼接的code */
  getSkuCode() {
    const joiner = new Joiner('#')
    this.pending.forEach(cell => {
      const cellCode = cell.getCellCode()
      joiner.join(cellCode)
    })
    return joiner.getStr()
  }

  /**sku是否选择完整 */
  isIntact() {
    if (this.size !== this.pending.length) {
      return false
    }
    for (let i = 0; i < this.size; i++) {
      if (this._isEmptyPart(i)) {
        return false
      }
    }
    return true
  }

  _isEmptyPart(index) {
    return this.pending[index] ? false : true
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