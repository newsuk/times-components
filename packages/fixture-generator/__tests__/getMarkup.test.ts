import MockMarkup from "../src/resolvers/mock-markup"

describe("get markup", () => {
   
    it("returns an array", () => {
        expect(new MockMarkup().create()).toEqual([])
    })

    it("should be able to generate paragraphs of markup", () => {
        const mockMarkup = new MockMarkup().withParagraph().withParagraph().withParagraph().create()
        for( const markup of mockMarkup) {
            expect(markup.name).toBe('paragraph')
        }
    })

    it("should be able to generate ads of markup", () => {
        const mockMarkup = new MockMarkup().withAd().create()
        for( const markup of mockMarkup) {
            expect(markup.name).toBe('ad')
        }
    })

    it("should be able to generate inline of markup", () => {
        const mockMarkup = new MockMarkup().withInline().withInline().create()
        for( const markup of mockMarkup) {
            expect(markup.name).toBe('inline')
        }
    })
})
