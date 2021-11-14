import { Http } from "../utils/http";
/*封装分页 */
class Paging {

    /*第几条 */
    start
    /*请求的数据条数 */
    count
    /*请求对象(url,data,method) */
    req
    /*此处_url是不变的,req中的url是变化的,需要拼接参数等 */
    _url
    /*是否还有更多数据 */
    moreData = true

    /**所有分页累加的数据,即 记录历史请求的数据 */
    accumulator = []
    /*锁 防止反复请求*/
    locker = false

    /*构造器 */
    constructor(req, count = 10, start = 0) {
        this.start = start
        this.count = count
        this.req = req
        this._url = req.url
    }

    /**请求获取更多 */
    async getMoreData() {
        if (!this.moreData) {
            return
        }
        /**锁住时不发起重复请求 */
        if (!this._getLocker()) {
            return
        }
        /*发起请求获取数据 */
        const data = await this._actualGetData()
        /*释放锁 */
        this._releaseLocker()
        return data
    }

    /*请求获取分页数据 */
    async _actualGetData() {
        const realReq = this._getCurrentReq()
        let paging = await Http.request(realReq)
        if (!paging) {
            return null
        }
        if (paging.total === 0) {
            return {
                empty: true,
                items: [],
                moreData: false,
                accumulator: []
            }
        }
        this.moreData = Paging._moreData(paging.total_page, paging.page)
        if (this.moreData) {
            this.start += this.count
        }
        this._accumulate(paging.items)
        return {
            empty: false,
            items: paging.items,
            moreData: this.moreData,
            accumulator: this.accumulator

        }
    }

    /**是否有更多数据 */
    static _moreData(totalPage, pageNum) {
        /**pageNum 0开始 */
        return pageNum + 1  < totalPage
    }

    /**将此次请求添加到累加器 */
    _accumulate(items) {
        this.accumulator = this.accumulator.concat(items)
    }

    /*获取真正发起分页请求的请求参数 */
    _getCurrentReq() {
        let url = this._url
        const params = `start=${this.start}&count=${this.count}`
        if (url.includes('?')) {
            url += '&' + params
        } else {
            url += '?' + params
        }
        this.req.url = url
        return this.req
    }

    /*获取锁 */
    _getLocker() {
        if (this.locker) {
            return false
        }
        /*获取到锁,然后锁住 */
        this.locker = true
        return true
    }

    /*释放锁 */
    _releaseLocker() {
        this.locker = false
    }
}

export {
    Paging
}