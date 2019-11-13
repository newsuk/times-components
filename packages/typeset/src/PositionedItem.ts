import AttributedString from './AttributedString';
import Point from './Point';

export default class PositionedItem {
  public text: AttributedString;
  public position: Point;

  constructor(text: AttributedString, position: Point) {
    this.text = text;
    this.position = position;
  }
}
