const { Http } = require("../utils/http")

class Banner{
    static locationB = 'b-1'
    static locationG = 'b-2'

    /**B 获取banner轮播图信息 */
    static async getHomeLocationB()  {
        return await Http.request({
            url: `banner/name/${Banner.locationB}`
        })
    }

        /**G 获取热卖区域banner信息 */
        static async getHomeLocationG()  {
            return await Http.request({
                url: `banner/name/${Banner.locationG}`
            })
        }

}

export { Banner }