const { Http } = require("../utils/http");

/*分类 */
class Category{

    /*获取六宫格信息 分类入口信息*/
    static async getLocationC() {
        return await Http.request({
            url: `category/grid/all`
        })
    }
}

export { Category }