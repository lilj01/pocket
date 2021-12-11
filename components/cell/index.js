Component({
  data: {},
  properties: {
    cell: Object
  },
  methods: {
    /**点击事件触发的函数 */
    onTap(event) {
      this.triggerEvent('celltap', {
        cell: this.properties.cell
      }, {
        bubbles: true,
        composed: true
      })
    }
  }
})