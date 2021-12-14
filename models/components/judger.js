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

/* 沟通类、本职类 */
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


  /* 初始化sku-pending */
  _initSkuPending() {
    this.skuPending = new SkuPending()
    /* 获取服务器默认需要选中的sku */
    const defaultSku = this.fenceGroup.getDefaultSku()
    if (!defaultSku) {
      return
    }
    /* 处理需要默认显示的sku */
    this.skuPending.init(defaultSku)
    /* 初始化默认选择的sku（cell） */
    this._initSelectedCell()
    /* 默认sku时，状态计算 */
    this._defalutSkuJudge()
  }

  /* 初始化默认选择的sku（cell） */
  _initSelectedCell() {
    this.skuPending.pending.forEach(cell => {
      this.fenceGroup.setCellStatusById(cell.id, CellStatus.SELECTED)
    })
  }

  /* 初始化sku数据字典 */
  initPathDict() {
    this.fenceGroup.spu.sku_list.forEach(sku => {
      const skuCode = new SkuCode(sku.code)
      this.pathDict = this.pathDict.concat(skuCode.totalSegments)
    })
  }

  /* 默认选中的sku调用 */
  _defalutSkuJudge() {
    return this.judge(null, null, null, true)
  }

  /* 执行判断的主方法 */
  judge(cell, x, y, isInit = false) {
    if (!isInit) {
      /* 对被点击的cell状态进行反选 */
      this._changeCurrentCellStatus(cell, x, y)
    }

    /* 对其他cell造成的影响，状态进行重新计算 */
    this.fenceGroup.eachCell((cell, x, y) => {
      const path = this._findPotentialPath(cell, x, y)
      if (!path) {
        return
      }
      /* 判断是否在字典，切换状态为禁用或可选 */
      const isIn = this._isInDict(path)
      if (isIn) {
        this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING)
      } else {
        this.fenceGroup.setCellStatusByXY(x, y, CellStatus.FORBIDDEN)
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
    if (cell.status === CellStatus.WAITING) {
      this.fenceGroup.setCellStatusByXY(x, y, CellStatus.SELECTED)
      this.skuPending.insertCell(cell, x)
    }
    if (cell.status === CellStatus.SELECTED) {
      this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING)
      this.skuPending.removeCell(x)
    }
  }

}

export {
  Judger
}