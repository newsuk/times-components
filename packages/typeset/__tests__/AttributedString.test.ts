import { AttributedString, AttributeTag } from '../src';

const tag: AttributeTag = {
  settings: {
    fontFamily: 'TimesDigitalW04',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 30
  },
  tag: 'FONT'
};

export const makeAttribute = (
  attrs: AttributeTag[][],
  start: number,
  length: number
): AttributeTag[][] => {
  for (let i = start; i < length; i++) {
    if (attrs[i]) {
      attrs[i].push(tag);
    } else {
      attrs[i] = [tag];
    }
  }
  return attrs;
};

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
  const newString2 = new AttributedString('bar', makeAttribute([], 0, 3));
  const joined = AttributedString.join([newString1, newString2]);
  expect(joined.string).toEqual('foobar');
});

test('AttributedString.join([])', () => {
  const joined = AttributedString.join([]);
  expect(joined.string).toEqual('');
});

test('AttributedString.slice(number)', () => {
  const attrs: AttributeTag[][] = [];
  makeAttribute(attrs, 0, 1);
  makeAttribute(attrs, 0, 3);
  makeAttribute(attrs, 0, 7);
  makeAttribute(attrs, 7, 3);
  const newString = new AttributedString('foobar', attrs);
  const slice = newString.slice(2);
  expect(slice.string).toEqual('obar');
  expect(slice.attributes.length).toEqual(4);
});

test('AttributedString.split()', () => {
  const attrs: AttributeTag[][] = [];
  makeAttribute(attrs, 0, 1);
  makeAttribute(attrs, 0, 3);
  makeAttribute(attrs, 0, 8);
  makeAttribute(attrs, 7, 3);
  const newString = new AttributedString('foo bar', attrs);
  const split = newString.split();
  expect(split.length).toEqual(4);
  expect(split).toMatchInlineSnapshot(`
    Array [
      AttributedString {
        "attributes": Array [
          Array [
            Object {
              "settings": Object {
                "fontFamily": "TimesDigitalW04",
                "fontSize": 18,
                "fontStyle": "normal",
                "fontWeight": "normal",
                "lineHeight": 30,
              },
              "tag": "FONT",
            },
            Object {
              "settings": Object {
                "fontFamily": "TimesDigitalW04",
                "fontSize": 18,
                "fontStyle": "normal",
                "fontWeight": "normal",
                "lineHeight": 30,
              },
              "tag": "FONT",
            },
            Object {
              "settings": Object {
                "fontFamily": "TimesDigitalW04",
                "fontSize": 18,
                "fontStyle": "normal",
                "fontWeight": "normal",
                "lineHeight": 30,
              },
              "tag": "FONT",
            },
          ],
        ],
        "length": 1,
        "split": [Function],
        "string": "f",
      },
      AttributedString {
        "attributes": Array [
          Array [
            Object {
              "settings": Object {
                "fontFamily": "TimesDigitalW04",
                "fontSize": 18,
                "fontStyle": "normal",
                "fontWeight": "normal",
                "lineHeight": 30,
              },
              "tag": "FONT",
            },
            Object {
              "settings": Object {
                "fontFamily": "TimesDigitalW04",
                "fontSize": 18,
                "fontStyle": "normal",
                "fontWeight": "normal",
                "lineHeight": 30,
              },
              "tag": "FONT",
            },
          ],
          Array [
            Object {
              "settings": Object {
                "fontFamily": "TimesDigitalW04",
                "fontSize": 18,
                "fontStyle": "normal",
                "fontWeight": "normal",
                "lineHeight": 30,
              },
              "tag": "FONT",
            },
            Object {
              "settings": Object {
                "fontFamily": "TimesDigitalW04",
                "fontSize": 18,
                "fontStyle": "normal",
                "fontWeight": "normal",
                "lineHeight": 30,
              },
              "tag": "FONT",
            },
          ],
        ],
        "length": 2,
        "split": [Function],
        "string": "oo",
      },
      AttributedString {
        "attributes": Array [
          Array [
            Object {
              "settings": Object {
                "fontFamily": "TimesDigitalW04",
                "fontSize": 18,
                "fontStyle": "normal",
                "fontWeight": "normal",
                "lineHeight": 30,
              },
              "tag": "FONT",
            },
          ],
        ],
        "length": 1,
        "split": [Function],
        "string": " ",
      },
      AttributedString {
        "attributes": Array [
          Array [
            Object {
              "settings": Object {
                "fontFamily": "TimesDigitalW04",
                "fontSize": 18,
                "fontStyle": "normal",
                "fontWeight": "normal",
                "lineHeight": 30,
              },
              "tag": "FONT",
            },
          ],
          Array [
            Object {
              "settings": Object {
                "fontFamily": "TimesDigitalW04",
                "fontSize": 18,
                "fontStyle": "normal",
                "fontWeight": "normal",
                "lineHeight": 30,
              },
              "tag": "FONT",
            },
          ],
          Array [
            Object {
              "settings": Object {
                "fontFamily": "TimesDigitalW04",
                "fontSize": 18,
                "fontStyle": "normal",
                "fontWeight": "normal",
                "lineHeight": 30,
              },
              "tag": "FONT",
            },
          ],
        ],
        "length": 3,
        "split": [Function],
        "string": "bar",
      },
    ]
  `);
});
