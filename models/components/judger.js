const {
  SkuCode
} = require("./sku-code")

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

}

export {
  Judger
}