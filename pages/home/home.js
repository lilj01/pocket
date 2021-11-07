import { Banner } from '../../model/banner.js'
import { Theme } from '../../model/theme.js'
Page({

    data: {
        themeA: '',
        bannerB: ''
    },

    /* 生命周期函数 onLoad*/
    async onLoad() {
       this.initAllData()
    },

    /*加载首页需要的数据 */
    async initAllData() {
        const themeA  = await Theme.getHomeLocationA()
        const bannerB = await Banner.getHomeLocationB()
        this.setData({
            themeA: themeA[0],
            bannerB:bannerB
        })
    }

})