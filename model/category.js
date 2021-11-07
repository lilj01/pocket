const { Http } = require("../utils/http");

/*分类 */
class Category{

    /*获取六宫格信息 */
    static async getGridCategory() {
        return await Http.request({
            url: `category/grid/all`
        })
    }
}

export { Category }