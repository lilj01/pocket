import {
    Paging
} from "../utils/Paging"

class SpuPaging {

    /**获取spu列表分页对象 */
    static async getLatestPaging() {
        return new Paging({
            url: `spu/latest`
        }, 5)
    }

    static getByCategoryPaging(cid, isRoot) {
        return new Paging({
        url: `spu/by/category/${cid}?is_root=${isRoot}`
        })
  }

}

export {
    SpuPaging
}