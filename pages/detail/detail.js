const { ShoppingWay } = require("../../core/enum")
import {SaleExplain} from "../../models/sale-explain";
import {getWindowHeightRpx} from "../../utils/system";

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
   onSpecChange(event) {
        this.setData({
          specs: event.detail
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
    const explain = await SaleExplain.getFixed()
    const windowHeight = await getWindowHeightRpx()
    const h = windowHeight - 100
    this.setData({
      spu,
      explain,
      h
    })
  }
})