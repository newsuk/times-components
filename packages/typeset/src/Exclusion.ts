export interface Exclusion {
  x: number;
  y: number;
  layout(): number[][];
  move(xOffset: number, yOffset: number): Exclusion;
}
