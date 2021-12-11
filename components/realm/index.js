/**realm：领域 fence：栅栏*/
const {
  FenceGroup
} = require("../../models/components/fence-group")
const {
  Judger
} = require("../../models/components/judger")

Component({
  properties: {
    spu: Object
  },
  data: {
    fences: [],
    judger: Object
  },

  observers: {
    'spu': function (spu) {
      if (!spu) {
        return
      }
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFences()
      const judger = new Judger(fenceGroup)
      this.data.judger = judger
      this.bindInitData(fenceGroup)
    }
  },
  methods: {
    bindInitData(fenceGroup) {
      this.setData({
        fences: fenceGroup.fences
      })
    },

    /* realm组件接受cell向上传递的点击事件 */
    onCellTap(e) {
      const cell = e.detail.cell
      const x = e.detail.x
      const y = e.detail.y
      const judger = this.data.judger
      judger.judge(cell, x, y)
      this.setData({
        fences: judger.fenceGroup.fences
      })
    }
  }
})