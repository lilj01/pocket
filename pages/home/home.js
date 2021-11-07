import { Activity } from '../../model/activity.js'
import { Banner } from '../../model/banner.js'
import { Category } from '../../model/category.js'
import { Theme } from '../../model/theme.js'
Page({

    data: {
        /**主题 位置A */
        themeA: null,
        /**轮播 位置B */
        bannerB: null,
        /**六宫格 位置C */
        grid: [],
        /**活动  位置D */
        activityD: null
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
        const grid = await Category.getLocationC()
        /**获取活动信息  */
        const activityD = await Activity.getLocationD()
        this.setData({
            themeA: themeA[0],
            bannerB:bannerB,
            grid,
            activityD
        })
    }

})