class Fence {

  /**规格值 一行 */
  valueTitles = []
  specs

  constructor(specs) {
    this.specs = specs
  }

  init() {
    this.specs.forEach(element => {
      this.pushValueTitle(element.value)
    })
  }

  /**将值推进行中 */
  pushValueTitle(title) {
    this.valueTitles.push(title)
  }
}

export {
  Fence
}