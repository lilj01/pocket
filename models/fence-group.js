import {
  Fence
} from "./fence"
import {
  Matrix
} from "./matrix"

class FenceGroup {

  spu
  skuList = []

  constructor(spu) {
    this.spu = spu
    this.skuList = spu.sku_list
  }

  /**初始化spec（规格值） */
  initFences() {
    const matrix = this._createMatrix(this.skuList)
    const fences = []
    let currentJ = -1;
    matrix.each((element, i, j) => {
      if (currentJ !== j) {
        // 开启一个新列，需要创建一个新的Fence
        currentJ = j
        fences[currentJ] = new Fence()
        // createFence
      }
      fences[currentJ].pushValueTitle(element.value)
    })
  }

  /**创建一个矩阵 */
  _createMatrix(skuList) {
    const m = []
    skuList.forEach(item => {
      m.push(item.specs)
    })
    return new Matrix(m)
  }

}

export {
  FenceGroup
}