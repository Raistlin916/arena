export default class Retrieve {
  constructor(list) {
    this.list = list
  }
  query(type) {
    return this.list.filter(item => item.className === type)
  }
}
