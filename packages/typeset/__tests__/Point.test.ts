import Point from '../src/Point';

test('Point#constructor', () => {
  expect(() => {
    const newPoint = new Point(10, 10);
    return newPoint;
  }).not.toThrow();
});
