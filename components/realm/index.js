/**realm：领域 fence：栅栏*/
const {
  FenceGroup
} = require("../../models/fence-group")

Component({
  properties: {
    spu: Object
  },
  data: {
    fences: []
  },

  observers: {
    'spu': function (spu) {
      if (!spu) {
        return
      }
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFences()
      this.bindInitData(fenceGroup)
    }
  },
  methods: {
    bindInitData(fenceGroup) {
      this.setData({
        fences: fenceGroup.fences
      })
    }
  }
})