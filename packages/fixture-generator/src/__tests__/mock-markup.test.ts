import MockMarkup from "../mock-markup"

describe("get markup", () => {

  it("returns an array", () => {
    expect(new MockMarkup().get()).toEqual([])
  })

  it("should be able to generate paragraphs of markup", () => {
    const mockMarkup = new MockMarkup().withParagraph().get()
    for (const markup of mockMarkup) {
      expect(markup.name).toBe('paragraph')
    }
  })

  it("should be able to generate ads of markup", () => {
    const mockMarkup = new MockMarkup().withAd().get()
    for (const markup of mockMarkup) {
      expect(markup.name).toBe('ad')
    }
  })

  it("should be able to generate inline of markup", () => {
    const mockMarkup = new MockMarkup().withInline().withInline().get()
    for (const markup of mockMarkup) {
      expect(markup.name).toBe('inline')
    }
  })

  it("should generate large markup shapes", () => 
    expect(new MockMarkup().withParagraphs(5).withAd().get()).toMatchSnapshot())
})
