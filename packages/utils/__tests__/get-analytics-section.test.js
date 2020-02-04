import { getSectionNameForAnalytics } from "../src";

describe("getSectionNameForAnalytics", () => {
  it("should return null when no tiles present", () => {
    const article = {
      tiles: null
    };
    expect(getSectionNameForAnalytics(article)).toEqual(null);
  });

  it("should return 'unknown section' when section title is not present", () => {
    const article = {
      tiles: [
        {
          slices: [
            {
              sections: []
            }
          ]
        }
      ]
    };
    expect(getSectionNameForAnalytics(article)).toEqual("unknown section");
  });

  it("should return 'unknown section' when section title is null", () => {
    const article = {
      tiles: [
        {
          slices: [
            {
              sections: [
                {
                  title: null
                }
              ]
            }
          ]
        }
      ]
    };
    expect(getSectionNameForAnalytics(article)).toEqual("unknown section");
  });

  it("should return correct section preferring not to be news", () => {
    const article = {
      tiles: [
        {
          slices: [
            {
              sections: [
                {
                  title: "ireland"
                },
                {
                  title: "news"
                }
              ]
            }
          ]
        }
      ]
    };
    expect(getSectionNameForAnalytics(article)).toEqual("ireland");
  });
});
