import {
  Joiner
} from "../../utils/joiner"
import {
  SkuPending
} from "./sku-pending"

const {
  SkuCode
} = require("./sku-code")
const {
  CellStatus
} = require("../../core/enum")

class Judger {

  fenceGroup

  /**可选的sku字典 */
  pathDict = []
  skuPending

  constructor(fenceGroup) {
    this.fenceGroup = fenceGroup
    this.initPathDict()
    this._initSkuPending()
  }


  _initSkuPending() {
    this.skuPending = new SkuPending
  }

  /* 初始化sku数据字典 */
  initPathDict() {
    this.fenceGroup.spu.sku_list.forEach(sku => {
      const skuCode = new SkuCode(sku.code)
      this.pathDict = this.pathDict.concat(skuCode.totalSegments)
    })
  }

  /* 执行判断的主方法 */
  judge(cell, x, y) {
    /* 对被点击的cell状态进行反选 */
    this._changeCurrentCellStatus(cell, x, y)
    /* 对其他cell造成的影响，状态进行重新计算 */
    this.fenceGroup.eachCell((cell, x, y) => {
      const path = this._findPotentialPath(cell, x, y)
      console.log(path)
      if (!path) {
        return
      }
      const currentCell = this.fenceGroup.fences[x].cells[y]
      const isIn = this._isInDict(path)
      if (isIn) {
        currentCell.status = CellStatus.WAITING
      } else {
        currentCell.status = CellStatus.FORBIDDEN
      }
    })
  }

  /* 是否在字典中 */
  _isInDict(path) {
    return this.pathDict.includes(path)
  }


  /* 寻找潜在path */
  _findPotentialPath(cell, x, y) {
    const joiner = new Joiner('#')
    for (let i = 0; i < this.fenceGroup.fences.length; i++) {
      const selected = this.skuPending.findSelectedCellByX(i)
      /* 当前行 */
      if (x === i) {
        /* 是选中的，返回空，不需要计算 */
        if (this.skuPending.isSelected(cell, x)) {
          return
        }
        const cellCode = this._getCellCode(cell.spec)
        joiner.join(cellCode)
      } else {
        /* 其他行 */
        if (selected) {
          const selectedCellCode = this._getCellCode(selected.spec)
          joiner.join(selectedCellCode)
        }
      }
    }
    return joiner.getStr()
  }


  /* 获取cell-code */
  _getCellCode(spec) {
    return spec.key_id + '-' + spec.value_id
  }

  /* 反选 */
  _changeCurrentCellStatus(cell, x, y) {
    /* 解决非引用传递不能修改cell状态的问题 */
    const realCell = this.fenceGroup.fences[x].cells[y]
    if (cell.status === CellStatus.WAITING) {
      realCell.status = CellStatus.SELECTED
      this.skuPending.insertCell(realCell, x)
    }
    if (cell.status === CellStatus.SELECTED) {
      realCell.status = CellStatus.WAITING
      this.skuPending.removeCell(x)
    }
  }

}

export {
  Judger
}