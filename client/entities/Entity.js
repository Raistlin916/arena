let GUID = 0

export default class Entity {
  constructor() {
    this.GUID = GUID
    GUID += 1
  }
}
