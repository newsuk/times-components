export default class Box {
  type = "box";

  value = "";

  width = 1;

  word = null;

  constructor(props = {}) {
    Object.assign(this, props);
  }
}
