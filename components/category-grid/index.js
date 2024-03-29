import { SpuListType } from "../../core/enum";
Component({

  properties: {
    /*六宫格数组 */
    grid: Array
  },
  methods: {
    onGoToCategory(event) {
      const cid = event.currentTarget.dataset.cid
      const rid = event.currentTarget.dataset.rid
      const pCid = cid ? cid : rid
      const isRoot = cid ? false : true
      const type = isRoot ? SpuListType.ROOT_CATEGORY : SpuListType.SUB_CATEGORY
      wx.navigateTo({
        url: `/pages/spu-list/spu-list?cid=${pCid}&type=${type}`
      })
    }
  }

})