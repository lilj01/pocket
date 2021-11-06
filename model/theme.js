import { Http } from "../utils/http";

/*主题 */
class Theme{

    /*获取首页位置A的主题信息 */
    static async getHomeLocationA () {
       return await Http.request({
            url: `theme/by/names`,
            data: {
                names: 't-1'
            }
        })
    }

}

export { Theme }