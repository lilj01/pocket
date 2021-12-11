const {
  SkuCode
} = require("./sku-code")
const {
  CellStatus
} = require("../../core/enum")

class Judger {

  fenceGroup

  /**可选的sku字典 */
  pathDict = []

  constructor(fenceGroup) {
    this.fenceGroup = fenceGroup
    this.initPathDict()
  }

  /* 初始化sku数据字典 */
  initPathDict() {
    this.fenceGroup.spu.sku_list.forEach(sku => {
      const skuCode = new SkuCode(sku.code)
      this.pathDict = this.pathDict.concat(skuCode.totalSegments)
    })
  }

  /**执行判断的主方法 */
  judge(cell, x, y) {
    this._changeCellStatus(cell, x, y)
  }

  /**反选 */
  _changeCellStatus(cell, x, y) {
    /* 解决非引用传递不能修改cell状态的问题 */
    const realCell = this.fenceGroup.fences[x].cells[y]
    if (cell.status === CellStatus.WAITING) {
      realCell.status = CellStatus.SELECTED
    }
    if (cell.status === CellStatus.SELECTED) {
      realCell.status = CellStatus.WAITING
    }
  }

}

export {
  Judger
}