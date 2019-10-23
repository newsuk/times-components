import { BoxExclusion } from '../src';

test('BoxExclusion#constructor(number, number, number, number)', () => {
  expect(() => {
    const newBox = new BoxExclusion(10, 10, 10, 10);
    return newBox;
  }).not.toThrow();
});

test('BoxExclusion#layout()', () => {
  const newBox = new BoxExclusion(10, 10, 10, 10);
  expect(newBox.layout()).toMatchInlineSnapshot(`
    Array [
      Array [
        10,
        10,
      ],
      Array [
        20,
        10,
      ],
      Array [
        20,
        20,
      ],
      Array [
        10,
        20,
      ],
      Array [
        10,
        10,
      ],
    ]
  `);
});

test('BoxExclusion#move(number, number)', () => {
  const newBox = new BoxExclusion(10, 10, 10, 10);
  expect(newBox.move(10, 10)).toMatchInlineSnapshot(`
    BoxExclusion {
      "height": 10,
      "width": 10,
      "x": 20,
      "y": 20,
    }
  `);
});
