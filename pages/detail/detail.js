const { ShoppingWay } = require("../../core/enum")
const {
  Spu
} = require("../../models/spu")

Page({

  data:{
    showRealm: false,
    cartItemCount: 0
  },

  onGotoHome(event){
    wx.switchTab({
      url:'/pages/home/home'
    })
  },

  onGotoCart(event){
    wx.switchTab({
      url:'/pages/cart/cart'
    })
  },

  onAddToCart(event){
    this.setData({
      showRealm:true,
      orderWay:ShoppingWay.CART
    })
  },
  onBuy(event){
    this.setData({
      showRealm:true,
      orderWay:ShoppingWay.BUY
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