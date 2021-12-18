import {
  Fence
} from "./fence"
import {
  Matrix
} from "./matrix"

class FenceGroup {

  spu
  skuList = []
  fences = []

  constructor(spu) {
    this.spu = spu
    this.skuList = spu.sku_list
  }

  /* 获取默认的sku */
  getDefaultSku() {
    const defaultSkuId = this.spu.default_sku_id
    if (!defaultSkuId) {
      return
    }
    return this.skuList.find(s => s.id === defaultSkuId)
  }

  /* 通过id修改cell状态 */
  setCellStatusById(cellId, status) {
    this.eachCell((cell) => {
      if (cell.id === cellId) {
        cell.status = status
      }
    })
  }

  getSku(skuCode) {
    const fullSkuCode = this.spu.id + '$' + skuCode
    return this.spu.sku_list.find(s => s.code === fullSkuCode)
  }

  /* 通过x y修改cell状态 */
  setCellStatusByXY(x, y, status) {
    this.fences[x].cells[y].status = status
  }

  /**初始化spec（规格值） 转置获取到fences*/
  initFences() {
    const matrix = this._createMatrix(this.skuList)
    const fences = []
    /**矩阵转置 */
    const at = matrix.transpose()
    at.forEach(specs => {
      const fence = new Fence(specs)
      fence.init()
      fences.push(fence)
    })
    this.fences = fences
  }

  /**遍历cell */
  eachCell(cb) {
    for (let x = 0; x < this.fences.length; x++) {
      const fence = this.fences[x]
      for (let y = 0; y < fence.cells.length; y++) {
        const cell = fence.cells[y]
        cb(cell, x, y)
      }
    }
  }

  /**创建一个矩阵 */
  _createMatrix(skuList) {
    const m = []
    skuList.forEach(sku => {
      m.push(sku.specs)
    })
    return new Matrix(m)
  }

}

export {
  FenceGroup
}