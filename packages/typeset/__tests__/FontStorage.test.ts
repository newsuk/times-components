import { FontStorage, TypographySettings } from '../src';

const testSettings: TypographySettings = {
  fontFamily: 'Foo',
  fontSize: 1,
  fontStyle: 'normal',
  fontWeight: 'normal',
  lineHeight: 1
};

test('FontStorage', () => {
  expect(FontStorage).toBeDefined();
  FontStorage.registerFont('Foo-Normal', () => ({ testSettings } as any));
  expect(FontStorage.getFont(testSettings)).toMatchInlineSnapshot(`
    Object {
      "testSettings": Object {
        "fontFamily": "Foo",
        "fontSize": 1,
        "fontStyle": "normal",
        "fontWeight": "normal",
        "lineHeight": 1,
      },
    }
  `);
  expect(() => {
    FontStorage.registerFont('Foo-Normal', () => ({ testSettings } as any));
  }).toThrow();
  expect(() => {
    FontStorage.getFont({
      ...testSettings,
      fontFamily: 'Baz'
    });
  }).toThrow();
  expect(FontStorage.getFont(testSettings)).toMatchInlineSnapshot(`
    Object {
      "testSettings": Object {
        "fontFamily": "Foo",
        "fontSize": 1,
        "fontStyle": "normal",
        "fontWeight": "normal",
        "lineHeight": 1,
      },
    }
  `);
});
