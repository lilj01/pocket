import { Banner } from '../../model/banner.js'
import { Category } from '../../model/category.js'
import { Theme } from '../../model/theme.js'
Page({

    data: {
        themeA: null,
        bannerB: null,
        grid: []
    },

    /* 生命周期函数 onLoad*/
    async onLoad() {
       this.initAllData()
    },

    /*加载首页需要的数据 */
    async initAllData() {
        /*位置A的图信息 */
        const themeA  = await Theme.getHomeLocationA()
        /*banner图信息 */
        const bannerB = await Banner.getHomeLocationB()
        /*获取六宫格信息 */
        const grid = await Category.getGridCategory()
        this.setData({
            themeA: themeA[0],
            bannerB:bannerB,
            grid
        })
    }

})