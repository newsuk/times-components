export default class Glue {
  width = 0;

  stretch = 12;

  shrink = 0;

  type = "glue";

  constructor(props = {}) {
    Object.assign(this, props);
  }
}
