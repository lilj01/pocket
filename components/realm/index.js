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
    judger: Object,
    previewImg: String,
    title: String,
    price: String,
    discountPrice: String

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
      const defaultSku = fenceGroup.getDefaultSku()
      /* 是否存在默认sku，存在优先绑定sku数据，否则绑定spu数据 */
      if (defaultSku) {
        this.bindSkuData(defaultSku)
      } else {
        this.bindSpuData()
      }
      this.bindInitData(fenceGroup)
    }
  },
  methods: {

    /* 绑定spu的数据 */
    bindSpuData() {
      const spu = this.properties.spu
      this.setData({
        previewImg: spu.img,
        title: spu.title,
        price: spu.price,
        discountPrice: spu.discount_price
      })
    },

    /* 绑定sku的数据 */
    bindSkuData(sku) {
      this.setData({
        previewImg: sku.img,
        title: sku.title,
        price: sku.price,
        discountPrice: sku.discount_price
      })
    },

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