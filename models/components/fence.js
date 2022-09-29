import {
  Cell
} from "./cell"

class Fence {

  /**规格值 一行 */
  cells = []
  /**有效规格 */
  specs
  /**规格名 如：颜色、尺寸 */
  title
  /**规格的keyId */
  id

  constructor(specs) {
    this.specs = specs
    this.title = specs[0].key
    this.id = specs[0].key_id
  }

  init() {
    this._initCells()
  }

  /**初始化cells，包括去重 */
  _initCells() {
    this.specs.forEach(s => {
      const existed = this.cells.some(c => {
        return c.id === s.value_id
      })
      if (existed) {
        return
      }
      const cell = new Cell(s)
      this.cells.push(cell)
    })
  }

  setFenceSkecth(skuList){
    this.cells.forEach(c => {
      this._setCellSkuImg(c,skuList)
    })
  }

  _setCellSkuImg(cell,skuList){
    const specCode = cell.getCellCode()
    const matchedSku = skuList.find(s => s.code.includes(specCode))
    if(matchedSku){
      cell.skuImg = matchedSku.img
    }
  }

}

export {
  Fence
}