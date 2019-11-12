import inside from 'point-in-polygon';
import { Exclusion } from './Exclusion';
import Point from './Point';
import Span from './Span';

export default class TextContainer {
  public exclusions: Exclusion[];
  public width: number;
  public height: number;
  public x: number;
  public y: number;
  private spanY: number = 0;
  private spans: Span[] = [];

  constructor(
    width: number,
    height: number,
    x: number,
    y: number,
    exclusions: Exclusion[] = []
  ) {
    this.exclusions = exclusions;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  public addExclusion(exclusion: Exclusion): void {
    this.exclusions = [...this.exclusions, exclusion];
    exclusion.layout();
  }

  public nextSpan(leading: number) {
    if (this.spans.length) {
      return this.spans.shift();
    }
    if (this.spanY > this.height) {
      return false;
    }
    const y = this.spanY;
    let x = 0;
    let current = new Span(new Point(x, y), new Point(x, y), this);
    while (x <= this.width) {
      for (const exclusion of this.exclusions) {
        if (inside([x, y], exclusion.layout())) {
          if (current.start.x < x - 1) {
            if (current.start.x < current.end.x) {
              this.spans.push(current);
            }
            current = new Span(new Point(x, y), new Point(x, y), this);
          }
          current.start = new Point(x + 1, y);
        }
      }
      current.end = new Point(x, y);
      x++;
    }
    this.spanY += leading;
    if (current.start.x < current.end.x) {
      this.spans.push(current);
    }
    return this.spans.shift();
  }
}
