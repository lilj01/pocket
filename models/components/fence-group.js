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