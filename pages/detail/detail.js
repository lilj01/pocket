const {
  Spu
} = require("../../models/spu")

Page({

  async onLoad(options) {
    const pid = options.pid
    const spu = await Spu.getDetail(pid)
    this.setData({
      spu
    })
  }
})