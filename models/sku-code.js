import {
  combination
} from '../utils/util'
class SkuCode {

  /*sku的code码，可以唯一代表一个商品 */
  code
  spuId
  totalSegments = []

  constructor(code) {
    this.code = code
    this._splitToSegments()
  }

  /**通过排列组合的组合方式，将所有可能的规格分割出来 */
  _splitToSegments() {
    //2$1-44#3-9#4-14
    const spuAndSpec = this.code.split('$')
    this.spuId = spuAndSpec[0]

    const specCodeArray = spuAndSpec[1].split('#')
    const len = specCodeArray.length

    for (let i = 1; i <= len; i++) {
      const segment = combination(specCodeArray, i).map(segs => {
        return segs.join('#')
      })
      this.totalSegments = this.totalSegments.concat(segment)
    }
  }

}

export {
  SkuCode
}