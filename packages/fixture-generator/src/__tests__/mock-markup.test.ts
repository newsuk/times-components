import MockMarkup from "../mock-markup";

describe("get markup", () => {
  it("returns an array", () => {
    expect(new MockMarkup().get()).toEqual([]);
  });

  it("should be able to generate paragraph of markup", () => {
    const mockMarkup = new MockMarkup().setParagraph().get();
    expect(mockMarkup).toMatchObject([ { name: "paragraph" } ]); 
  });

  it("should be able to generate markup with ads", () => {
    const mockMarkup = new MockMarkup().setAd().get();
    expect(mockMarkup).toMatchObject([ { name: "ad" } ]); 
  });

  it("should be able to generate inline of markup", () => {
    const mockMarkup = new MockMarkup().setInline().get();
    expect(mockMarkup).toMatchObject([ { name: "inline" } ]); 
  });

  it("should generate large markup shapes", () => {
    expect(
      new MockMarkup()
        .setParagraphs(5)
        .setAd()
        .get()
    ).toMatchObject([
      { name: "paragraph" },
      { name: "paragraph" },
      { name: "paragraph" },
      { name: "paragraph" },
      { name: "paragraph" },
      { name: "ad" }
    ])
  });
});
