import MockMarkup from "../mock-markup";

describe("get markup", () => {
  it("returns an array", () => {
    expect(new MockMarkup().get()).toEqual([]);
  });

  it("should be able to generate paragraph of markup", () => {
    expect(new MockMarkup().withParagraph().get()).toMatchInlineSnapshot(`
Array [
  Object {
    "attributes": Object {},
    "children": Array [
      Object {
        "attributes": Object {
          "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        },
        "children": Array [],
        "name": "text",
      },
    ],
    "name": "paragraph",
  },
]
`);
  });

  it("should be able to generate markup with ads", () => {
    expect(new MockMarkup().withAd().get()).toMatchInlineSnapshot(`
Array [
  Object {
    "attributes": Object {},
    "children": Array [],
    "name": "ad",
  },
]
`);
  });

  it("should be able to generate inline of markup", () => {
    expect(new MockMarkup().withInline().get()).toMatchInlineSnapshot(`
Array [
  Object {
    "attributes": Object {},
    "children": Array [
      Object {
        "attributes": Object {
          "value": "inline markup",
        },
        "children": Array [],
        "name": "text",
      },
    ],
    "name": "inline",
  },
]
`);
  });

  it("should generate large markup shapes", () => {
    expect(
      new MockMarkup()
        .withParagraphs(5)
        .withAd()
        .get()
    ).toMatchInlineSnapshot(`
Array [
  Object {
    "attributes": Object {},
    "children": Array [
      Object {
        "attributes": Object {
          "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        },
        "children": Array [],
        "name": "text",
      },
    ],
    "name": "paragraph",
  },
  Object {
    "attributes": Object {},
    "children": Array [
      Object {
        "attributes": Object {
          "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        },
        "children": Array [],
        "name": "text",
      },
    ],
    "name": "paragraph",
  },
  Object {
    "attributes": Object {},
    "children": Array [
      Object {
        "attributes": Object {
          "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        },
        "children": Array [],
        "name": "text",
      },
    ],
    "name": "paragraph",
  },
  Object {
    "attributes": Object {},
    "children": Array [
      Object {
        "attributes": Object {
          "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        },
        "children": Array [],
        "name": "text",
      },
    ],
    "name": "paragraph",
  },
  Object {
    "attributes": Object {},
    "children": Array [
      Object {
        "attributes": Object {
          "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        },
        "children": Array [],
        "name": "text",
      },
    ],
    "name": "paragraph",
  },
  Object {
    "attributes": Object {},
    "children": Array [],
    "name": "ad",
  },
]
`);
  });
});
