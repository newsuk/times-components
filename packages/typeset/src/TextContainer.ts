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
  public spans: Span[] = [];

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
    this.spans = [];
  }

  public calculateSpans = function(
    this: TextContainer,
    leading: number
  ): Span[] {
    if (this.spans.length) {
      return this.spans;
    }
    const spans: Span[] = [];
    let y = leading / 2;
    if (!this.exclusions.length) {
      while (y <= this.height) {
        spans.push(new Span(new Point(0, y), new Point(this.width, y), this));
        y += leading;
      }
      this.spans = spans;
      return this.spans;
    } else {
      let x = 0;
      let current = new Span(new Point(x, y), new Point(x, y), this);
      while (y <= this.height) {
        while (x <= this.width) {
          for (const exclusion of this.exclusions) {
            const pt: [number, number] = [x, y];
            if (inside(pt, exclusion.layout())) {
              if (current.start.x < x - 1) {
                spans.push(current);
                current = new Span(new Point(x, y), new Point(x, y), this);
              }
              current.start = new Point(x + 1, y);
            }
          }
          current.end = new Point(x, y);
          x++;
        }
        y += leading;
        x = 0;
        spans.push(current);
        current = new Span(new Point(0, y), new Point(0, y), this);
      }
      this.spans = spans.filter(({ start, end }) => start.x < end.x);
      return this.spans;
    }
  };
}
