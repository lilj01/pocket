import {
  Http
} from '../utils/http'

class Spu {

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