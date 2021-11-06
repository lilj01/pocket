import { Theme } from '../../model/theme.js'
Page({

    data: {},

    onLoad: async function() {
        const data  = await Theme.getHomeLocationA()
        this.setData({
            entrance_img: data[0].entrance_img
        })
    }
})