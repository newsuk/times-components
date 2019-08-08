export default class TextStyle {
  size = null;

  font = null;

  tracking = null;

  characterCase = null;

  fillColor = null;

  strokeColor = null;

  strokeWidth = null;

  constructor(props) {
    Object.assign(this, props);
  }
}
