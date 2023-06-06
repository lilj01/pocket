const {
    Http
} = require("../utils/http")

class Banner {
    static locationB = 'b-1'
    static locationG = 'b-2'

    /**B 获取banner轮播图信息 */
    static async getHomeLocationB() {
        return await Http.request({
            url: `banner/name/${Banner.locationB}`
        })
    }

    /**G 获取热卖区域banner信息 */
    static async getHomeLocationG() {
        return await Http.request({
            url: `banner/name/${Banner.locationG}`
        })
    }

    static gotoTarget(type, keyword) {
        switch (type) {
        case BannerItemType.SPU:
            wx.navigateTo({
            url: `/pages/detail/detail?pid=${keyword}`
            })
            break
        case BannerItemType.THEME:
            wx.navigateTo({
            url: `/pages/theme/theme?tname=${keyword}`
            })
            break
        case BannerItemType.SPU_LIST:
            wx.navigateTo({
            url: `/pages/theme-spu-list/theme-spu-list?tname=${keyword}`
            })
            break
        }
  }

}

export {
    Banner
}