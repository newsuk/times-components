import MockMarkup from "../mock-markup";

describe("get markup", () => {
  it("returns an array", () => {
    expect(new MockMarkup().get()).toEqual([]);
  });

  it("should be able to generate paragraph of markup", () => {
    const mockMarkup = new MockMarkup().addParagraphs().get();
    expect(mockMarkup).toMatchObject([{ name: "paragraph" }]);
  });

  it("should be able to generate markup with ads", () => {
    const mockMarkup = new MockMarkup().addAds().get();
    expect(mockMarkup).toMatchObject([{ name: "ad" }]);
  });

  it("should be able to generate inline of markup", () => {
    const mockMarkup = new MockMarkup().addInlines().get();
    expect(mockMarkup).toMatchObject([{ name: "inline" }]);
  });

  it("should generate large markup shapes", () => {
    expect(
      new MockMarkup()
        .addParagraphs(5)
        .addAds()
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

  it("should be able to generate summaries", () => {
    const mockMarkup = new MockMarkup().addSummary("summary125").get();
    expect(mockMarkup).toMatchObject([{ name: "paragraph" }]);
    expect(mockMarkup[0].children[0].attributes.value.length).toBeLessThanOrEqual(125);
  });
});
