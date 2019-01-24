import mockEditionSlice from "../mock-edition-slice";
import { LeadOneAndTwoSlice, LeadOneFullWidthSlice, LeadOneAndOneSlice } from "../types";

describe("The Mock EditionSlice", () => {
  it("returns LeadOneFullWidthSlice", () => {
    const articleSlice = mockEditionSlice("LeadOneFullWidthSlice") as LeadOneFullWidthSlice;
    expect(articleSlice.items.length).toBe(1);
    expect(articleSlice.lead).toBeDefined();
  });

  it("returns LeadOneAndOneSlice", () => {
    const articleSlice = mockEditionSlice("LeadOneAndOneSlice") as LeadOneAndOneSlice;
    expect(articleSlice.items.length).toBe(2);
    expect(articleSlice.lead).toBeDefined();
    expect(articleSlice.support).toBeDefined();
  });

  it("returns LeadOneAndTwoSlice", () => {
    const articleSlice = mockEditionSlice("LeadOneAndTwoSlice") as LeadOneAndTwoSlice;
    expect(articleSlice.items.length).toBe(3);
    expect(articleSlice.lead).toBeDefined();
    expect(articleSlice.support1).toBeDefined();
    expect(articleSlice.support2).toBeDefined();
  });
});
