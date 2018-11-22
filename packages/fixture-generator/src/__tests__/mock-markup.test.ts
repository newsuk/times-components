import MockMarkup from "../mock-markup"

describe("get markup", () => {

  it("returns an array", () => {
    expect(new MockMarkup().create()).toEqual([])
  })

  it("should be able to generate paragraphs of markup", () => {
    const mockMarkup = new MockMarkup().withParagraph().withParagraph()
      .withParagraph().create()
    for (const markup of mockMarkup) {
      expect(markup.name).toBe('paragraph')
    }
  })

  it("should be able to generate ads of markup", () => {
    const mockMarkup = new MockMarkup().withAd().create()
    for (const markup of mockMarkup) {
      expect(markup.name).toBe('ad')
    }
  })

  it("should be able to generate inline of markup", () => {
    const mockMarkup = new MockMarkup().withInline().withInline().create()
    for (const markup of mockMarkup) {
      expect(markup.name).toBe('inline')
    }
  })

  it("should generate large markup shapes", () => {
    const expected = [{
        name: "paragraph",
        attributes: {},
        children: [{
          name: "text",
          attributes: {
            value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
          },
          children: []
        }]
      },
      {
        name: "paragraph",
        attributes: {},
        children: [{
          name: "text",
          attributes: {
            value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
          },
          children: []
        }]
      },
      {
        name: "paragraph",
        attributes: {},
        children: [{
          name: "text",
          attributes: {
            value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
          },
          children: []
        }]
      },
      {
        name: "paragraph",
        attributes: {},
        children: [{
          name: "text",
          attributes: {
            value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
          },
          children: []
        }]
      },
      {
        name: "paragraph",
        attributes: {},
        children: [{
          name: "text",
          attributes: {
            value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
          },
          children: []
        }]
      },
      {
        name: "ad",
        attributes: {},
        children: []
      }
    ];

    const mockMarkup = new MockMarkup().withXParagraphs(5).withAd().create()

    expect(mockMarkup).toEqual(expected)

  })
})
