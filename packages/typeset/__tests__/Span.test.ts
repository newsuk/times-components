import { TextContainer } from '../src';
import Point from '../src/Point';
import Span from '../src/Span';

test('Span#constructor', () => {
  expect(() => {
    const newSpan = new Span(
      new Point(10, 10),
      new Point(20, 20),
      new TextContainer(0, 0, 0, 0)
    );
    return newSpan;
  }).not.toThrow();
});
