const { Http } = require("../utils/http")

class Banner{
    static locationB = 'b-1'

    /**获取banner轮播图信息 */
    static async getHomeLocationB()  {
        return await Http.request({
            url: `banner/name/${Banner.locationB}`
        })
    }
}

export { Banner }