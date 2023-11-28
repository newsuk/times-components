import { getSectionFromTiles } from "../src/index";

describe("getSectionFromTiles should", () => {
  it("return the correct section name", () => {
    const article = {
      tiles: [
        {
          slices: [
            {
              sections: [
                {
                  title: "Culture"
                }
              ]
            }
          ]
        },
        {
          slices: [
            {
              sections: []
            }
          ]
        }
      ]
    };
    expect(getSectionFromTiles(article)).toEqual("culture");
  });

  it("return the correct section name no matter the slice index position", () => {
    const article = {
      tiles: [
        {
          slices: [
            {
              sections: []
            }
          ]
        },
        {
          slices: [
            {
              sections: [
                {
                  title: "Culture"
                }
              ]
            }
          ]
        }
      ]
    };
    expect(getSectionFromTiles(article)).toEqual("culture");
  });

  it("return the default section name when there is no data for the section", () => {
    const article = {
      tiles: [
        {
          slices: [
            {
              sections: []
            }
          ]
        },
        {
          slices: [
            {
              sections: []
            }
          ]
        }
      ]
    };
    expect(getSectionFromTiles(article)).toEqual("default");
  });

  it("return the default section name when there is missing nested structure", () => {
    const article = {
      tiles: []
    };
    expect(getSectionFromTiles(article)).toEqual("default");
  });
});
