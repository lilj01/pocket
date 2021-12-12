/* 将选择的规格存在该对象 */
class SkuPending {
  pending = []

  constructor() {

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