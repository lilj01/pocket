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
    console.log(this.pathDict)
  }

  /**执行判断的主方法 */
  judge(cell) {
    this._changeCellStatus(cell)
  }

  /**反选 */
  _changeCellStatus(cell) {
    if (cell.status === CellStatus.WAITING) {
      cell.status = CellStatus.SELECTED
    }
    if (cell.status === CellStatus.SELECTED) {
      cell.status = CellStatus.WAITING
    }
  }

}

export {
  Judger
}