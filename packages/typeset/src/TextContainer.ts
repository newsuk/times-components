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

  public calculateSpans = function*(
    this: TextContainer,
    leading: number
  ): Generator<Span> {
    let y = 0;
    let x = 0;
    let current = new Span(new Point(x, y), new Point(x, y), this);
    while (y <= this.height) {
      while (x <= this.width) {
        for (const exclusion of this.exclusions) {
          if (inside([x, y], exclusion.layout())) {
            if (current.start.x < x - 1) {
              if (current.start.x < current.end.x) {
                yield current;
              }
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
      if (current.start.x < current.end.x) {
        yield current;
      }
      current = new Span(new Point(0, y), new Point(0, y), this);
    }
  };
}
