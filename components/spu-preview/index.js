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
  methods: {}
})