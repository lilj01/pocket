Component({
  data: {},
  properties: {
    cell: Object,
    y: Number,
    x: Number
  },
  methods: {
    /**点击事件触发的函数 */
    onTap(event) {
      this.triggerEvent('celltap', {
        cell: this.properties.cell,
        x: this.properties.x,
        y: this.properties.y
      }, {
        bubbles: true,
        composed: true
      })
    }
  }
})