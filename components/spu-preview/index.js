Component({
  data: {
    tags: Array
  },
  properties: {
    data: Object
  },
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