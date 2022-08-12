const {
  Spu
} = require("../../models/spu")

Page({

  data:{
    showRealm: false,
    cartItemCount: 0
  },

  onAddToCart(event){
    this.setData({
      showRealm:true
    })
  },
  onBuy(event){
    this.setData({
      showRealm:true
    })
  },

  async onLoad(options) {
    const pid = options.pid
    const spu = await Spu.getDetail(pid)
    this.setData({
      spu
    })
  }
})