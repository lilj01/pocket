/**realm：领域 fence：栅栏*/
const {
  default: integer
} = require("../../miniprogram_npm/lin-ui/common/async-validator/validator/integer")
const {
  Cell
} = require("../../models/components/cell")
const {
  FenceGroup
} = require("../../models/components/fence-group")
const {
  Judger
} = require("../../models/components/judger")
const {
  Spu
} = require("../../models/spu")

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
    discountPrice: String,
    stock: integer,
    noSpec: Boolean,
    skuIntact: Boolean
  },

  observers: {
    'spu': function (spu) {
      if (!spu) {
        return
      }
      if (Spu.isNoSpec(spu)) {
        this.processNoSpec(spu)
      } else {
        this.processHasSpec(spu)
      }
    }
  },
  methods: {

    /**无规格信息时执行 */
    processNoSpec(spu) {
      this.setData({
        noSpec: true
      })
      this.bindSkuData(spu.sku_list[0])
    },

    /**有规格信息时执行 */
    processHasSpec(spu) {
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
      this.bindTipData()
      this.bindFenceGroupData(fenceGroup)
    },

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
        discountPrice: sku.discount_price,
        stock: sku.stock
      })
    },

    bindTipData() {
      this.setData({
        skuIntact: this.data.judger.isSkuIntact(),
        currentValues: this.data.judger.getCurrentValues(),
        missingKeys: this.data.judger.getMissingKeys()
      })
    },

    bindFenceGroupData(fenceGroup) {
      this.setData({
        fences: fenceGroup.fences
      })
    },

    /* realm组件接受cell向上传递的点击事件 */
    onCellTap(e) {
      const dataCell = e.detail.cell
      const x = e.detail.x
      const y = e.detail.y

      const cell = new Cell(dataCell.spec)
      cell.status = dataCell.status
      const judger = this.data.judger
      judger.judge(cell, x, y)
      const skuIntact = judger.isSkuIntact()
      if (skuIntact) {
        const currentSku = judger.getDeterminateSku()
        this.bindSkuData(currentSku)
      }
      this.bindTipData()
      this.bindFenceGroupData(judger.fenceGroup)
    }
  }
})