Component({
  data: {
    tags: Array
  },
  properties: {
    data: Object
  },

  /**监听data，对tags字符串进行处理，成为一个数组 */
  observers: {
    data: function (data) {
      if (!data) {
        return
      }
      if (!data.tags) {
        return
      }
      const tags = data.tags.split('$')
      this.setData({
        tags
      })
    }
  },


  methods: {

    /**让图片按比例处理显示 */
    onImgLoad(event) {
      const {
        width,
        height
      } = event.detail
      this.setData({
        w: 340,
        h: 340 * height / width
      })
    },

    /**点击跳转 */
    onItemTap(event) {
      const pid = event.currentTarget.dataset.pid
      wx.navigateTo({
        url: `/pages/detail/detail?pid=${pid}`
      })
    }

  }
})