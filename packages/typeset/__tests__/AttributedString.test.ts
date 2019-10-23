import { Attribute, AttributedString } from '../src';

export const makeAttribute = (start: number, length: number): Attribute => ({
  length,
  start,
  tag: {
    settings: {
      fontFamily: 'TimesDigitalW04',
      fontSize: 18,
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: 30
    },
    tag: 'FONT'
  }
});

test('AttributedString#constructor(string, [])', () => {
  expect(() => {
    const newString = new AttributedString('foobar', []);
    return newString;
  }).not.toThrow();
});

test('AttributedString#charAt(number)', () => {
  const newString = new AttributedString('foobar', []);
  expect(newString.charAt(0)).toEqual('f');
  expect(newString.charAt(3)).toEqual('b');
});

test('AttributedString.join([Self, Self])', () => {
  const newString1 = new AttributedString('foo', []);
  const newString2 = new AttributedString('bar', [makeAttribute(0, 3)]);
  const joined = AttributedString.join([newString1, newString2]);
  expect(joined.string).toEqual('foobar');
});

test('AttributedString.slice(number)', () => {
  const newString = new AttributedString('foobar', [
    makeAttribute(0, 1),
    makeAttribute(0, 3),
    makeAttribute(0, 7),
    makeAttribute(7, 3)
  ]);
  const slice = newString.slice(2);
  expect(slice.string).toEqual('obar');
  expect(slice.attributes.length).toEqual(2);
  expect(slice.attributes[0].length).toEqual(1);
  expect(slice.attributes[1].length).toEqual(4);
});

test('AttributedString.split()', () => {
  const newString = new AttributedString('foo bar', [
    makeAttribute(0, 1),
    makeAttribute(0, 3),
    makeAttribute(0, 8),
    makeAttribute(7, 3)
  ]);
  const split = newString.split();
  expect(split.length).toEqual(5);
  expect(split).toMatchInlineSnapshot(`
    Array [
      AttributedString {
        "attributes": Array [
          Object {
            "length": 1,
            "start": 0,
            "tag": Object {
              "settings": Object {
                "fontFamily": "TimesDigitalW04",
                "fontSize": 18,
                "fontStyle": "normal",
                "fontWeight": "normal",
                "lineHeight": 30,
              },
              "tag": "FONT",
            },
          },
        ],
        "length": 1,
        "split": [Function],
        "string": "f",
      },
      AttributedString {
        "attributes": Array [
          Object {
            "length": 1,
            "start": 0,
            "tag": Object {
              "settings": Object {
                "fontFamily": "TimesDigitalW04",
                "fontSize": 18,
                "fontStyle": "normal",
                "fontWeight": "normal",
                "lineHeight": 30,
              },
              "tag": "FONT",
            },
          },
        ],
        "length": 3,
        "split": [Function],
        "string": "foo",
      },
      AttributedString {
        "attributes": Array [
          Object {
            "length": 1,
            "start": 0,
            "tag": Object {
              "settings": Object {
                "fontFamily": "TimesDigitalW04",
                "fontSize": 18,
                "fontStyle": "normal",
                "fontWeight": "normal",
                "lineHeight": 30,
              },
              "tag": "FONT",
            },
          },
        ],
        "length": 3,
        "split": [Function],
        "string": "foo",
      },
      AttributedString {
        "attributes": Array [],
        "length": 1,
        "split": [Function],
        "string": " ",
      },
      AttributedString {
        "attributes": Array [],
        "length": 3,
        "split": [Function],
        "string": "bar",
      },
    ]
  `);
});
