import { Activity } from '../../model/activity.js'
import { Banner } from '../../model/banner.js'
import { Category } from '../../model/category.js'
import { SpuPaging } from '../../model/spu-paging.js'
import { Theme } from '../../model/theme.js'
Page({

    data: {
        /**主题 位置A */
        themeA: null,
        themeE:null,
        themeESpu:null,
        themeF:null,
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
       this.initBottomSpuList()
    },

    /*加载首页需要的数据 */
    async initAllData() {
       /**通过面向对象的思想，合并http请求，此处需要实例化Theme对象 */
        const themeModel = new Theme()
        await themeModel.getThemes()
        /*位置A的图信息 */
        const themeA = await themeModel.getHomeLocationA()

        /*banner图信息 */
        const bannerB = await Banner.getHomeLocationB()
        /*获取六宫格信息 */
        const grid = await Category.getLocationC()
        /**获取活动信息  */
        const activityD = await Activity.getLocationD()

        /*位置E的图信息 */
        const themeE = await themeModel.getHomeLocationE()
        
        /**E位置的详情及spu信息 */
        let themeESpu = []
        if (themeE.online) {
            const data = await Theme.getHomeLocationESpu()
            if (data) {
                themeESpu =  data.spu_list.slice(0,8)
            }
        }       

        /**位置F的信息 */
        const themeF = await themeModel.getHomeLocationF()
        /**位置G的信息 */
        const bannerG = await Banner.getHomeLocationG()
        /**位置H的信息 */
        const themeH = await themeModel.getHomeLocationH()

        this.setData({
            themeA,
            bannerB,
            grid,
            activityD,
            themeE,
            themeESpu,
            themeF,
            bannerG,
            themeH
        })
    },

    /*加载底部spuList */
    async initBottomSpuList() {
        const spuPaging = await SpuPaging.getLatestPaging()
        const data = spuPaging.getMoreData()
        if (!data) {
            return
        }
    }

})