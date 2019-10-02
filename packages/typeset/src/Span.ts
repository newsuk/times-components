import Point from './Point';
import TextContainer from './TextContainer';

export default class Span {
  public start: Point;
  public end: Point;
  public container: TextContainer;

  constructor(start: Point, end: Point, container: TextContainer) {
    this.start = start;
    this.end = end;
    this.container = container;
  }
}
