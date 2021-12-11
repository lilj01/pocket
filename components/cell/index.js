Component({
  data: {},
  properties: {
    cell: Object
  },
  methods: {
    /**点击事件触发的函数 */
    onTap(event) {
      console.log('cell被点击')
      this.triggerEvent('celltap', {

      })
    }
  }
})