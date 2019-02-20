import mockArticleSlice, { mockLeadOneAndFourSlice, mockLeadOneAndTwoSlice, mockLeadOneFullWidthSlice, mockLeadOneAndOneSlice, mockLeadersSlice, mockSecondaryOneSlice, mockSecondaryTwoNoPicAndTwoSlice, mockListTwoAndSixNoPicSlice, mockSecondaryTwoAndTwoSlice, mockPuzzleSlice } from "../mock-slice";

describe("The Mock EditionSlice", () => {
  it("returns the minimum articleSlice requirements", () => {
    const articleSlice = mockArticleSlice(1);
    expect(articleSlice.items[0]).toHaveProperty("article");
    expect(articleSlice.items[0]).toHaveProperty("headline");
    expect(articleSlice.items[0]).toHaveProperty("leadAsset");
  });

  it("returns LeadOneAndFourSlice", () => {
    const articleSlice = mockLeadOneAndFourSlice();
    expect(articleSlice.items.length).toBe(5);
    expect(articleSlice.lead).toBeDefined();
    expect(articleSlice.support1).toBeDefined();
    expect(articleSlice.support2).toBeDefined();
    expect(articleSlice.support3).toBeDefined();
    expect(articleSlice.support4).toBeDefined();
  });

  it("returns LeadOneFullWidthSlice", () => {
    const articleSlice = mockLeadOneFullWidthSlice();
    expect(articleSlice.items.length).toBe(1);
    expect(articleSlice.lead).toBeDefined();
  });

  it("returns LeadOneAndOneSlice", () => {
    const articleSlice = mockLeadOneAndOneSlice();
    expect(articleSlice.items.length).toBe(2);
    expect(articleSlice.lead).toBeDefined();
    expect(articleSlice.support).toBeDefined();
  });

  it("returns LeadOneAndTwoSlice", () => {
    const articleSlice = mockLeadOneAndTwoSlice();
    expect(articleSlice.items.length).toBe(3);
    expect(articleSlice.lead).toBeDefined();
    expect(articleSlice.support1).toBeDefined();
    expect(articleSlice.support2).toBeDefined();
  });

  it("returns SecondaryOneSlice", () => {
    const articleSlice = mockSecondaryOneSlice();
    expect(articleSlice.items.length).toBe(1);
    expect(articleSlice.secondary).toBeDefined();
  });

  it("returns SecondaryTwoAndTwoSlice", () => {
    const articleSlice = mockSecondaryTwoAndTwoSlice();
    expect(articleSlice.items.length).toBe(4);
    expect(articleSlice.secondary1).toBeDefined();
    expect(articleSlice.secondary1).toBeDefined();
    expect(articleSlice.support1).toBeDefined();
    expect(articleSlice.support2).toBeDefined();
  });

  it("returns SecondaryTwoNoPicAndTwoSlice", () => {
    const articleSlice = mockSecondaryTwoNoPicAndTwoSlice();
    expect(articleSlice.items.length).toBe(4);
    expect(articleSlice.secondary1).toBeDefined();
    expect(articleSlice.secondary1).toBeDefined();
    expect(articleSlice.support1).toBeDefined();
    expect(articleSlice.support2).toBeDefined();
  });

  it("returns List2And6NoPicSlice", () => {
    const articleSlice = mockListTwoAndSixNoPicSlice();
    expect(articleSlice.items.length).toBe(8);
    expect(articleSlice.lead1).toBeDefined();
    expect(articleSlice.lead2).toBeDefined();
    expect(articleSlice.support1).toBeDefined();
    expect(articleSlice.support2).toBeDefined();
    expect(articleSlice.support3).toBeDefined();
    expect(articleSlice.support4).toBeDefined();
    expect(articleSlice.support5).toBeDefined();
    expect(articleSlice.support6).toBeDefined();
  });

  it("returns LeadersSlice", () => {
    const articleSlice = mockLeadersSlice();
    expect(articleSlice.items.length).toBe(3);
    expect(articleSlice.leader1).toBeDefined();
    expect(articleSlice.leader2).toBeDefined();
    expect(articleSlice.leader3).toBeDefined();
  });

  it("returns PuzzleMock", () => {
    const puzzleSice = mockPuzzleSlice();
    expect(puzzleSice.title).toBeDefined();
    expect(puzzleSice.url).toBeDefined();
    expect(puzzleSice.image).toBeDefined();
  });
});
