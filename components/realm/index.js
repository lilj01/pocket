const {
  FenceGroup
} = require("../../models/fence-group")

Component({
  properties: {
    spu: Object
  },
  data: {

  },

  observers: {
    'spu': function (spu) {
      if (!spu) {
        return
      }
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFences()
    }
  },
  methods: {}
})