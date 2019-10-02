import { Exclusion } from './Exclusion';

export default class BoxExclusion implements Exclusion {
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  public layout(): number[][] {
    return [
      [this.x, this.y],
      [this.x + this.width, this.y],
      [this.x + this.width, this.y + this.height],
      [this.x, this.y + this.height],
      [this.x, this.y]
    ];
  }

  public move(x: number, y: number): BoxExclusion {
    return new BoxExclusion(this.x + x, this.y + y, this.width, this.height);
  }
}
