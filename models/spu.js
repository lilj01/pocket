import {
  Http
} from '../utils/http'

class Spu {

  /**判断是否没有规格 */
  static isNoSpec(spu) {
    if (spu.sku_list.length === 1 && spu.sku_list[0].specs.length === 0) {
      return true
    }
    false
  }

  /**获取spu详情 */
  static getDetail(id) {
    return Http.request({
      url: `spu/id/${id}/detail`
    })
  }
}

export {
  Spu
}