import getStandardTemplateCrop from "../src/crop-config";

const leadAsset = {
  crop11: {
    ratio: "1:1",
    url: "https://crop11.io/"
  },
  crop23: {
    ratio: "2:3",
    url: "https://crop23.io/"
  },
  crop32: {
    ratio: "3:2",
    url: "https://crop32.io/"
  },
  crop45: {
    ratio: "4:5",
    url: "https://crop45.io/"
  },
  crop169: {
    ratio: "16:9",
    url: "https://crop169.io/"
  },
  crop1251: {
    ratio: "1.25:1",
    url: "https://crop1251.io/"
  }
};

describe("for the standard template it should", () => {
  it("return the 16:9 crop when present", () => {
    expect(getStandardTemplateCrop(leadAsset).ratio).toEqual("16:9");
  });

  it("return the 3:2 crop", () => {
    const leadAssetNo169 = { ...leadAsset, crop169: null };
    expect(getStandardTemplateCrop(leadAssetNo169).ratio).toEqual("3:2");
  });

  it("return the 1.25:1 crop", () => {
    const leadAssetNo32 = {
      ...leadAsset,
      crop32: null,
      crop169: null
    };
    expect(getStandardTemplateCrop(leadAssetNo32).ratio).toEqual("1.25:1");
  });

  it("return the 1:1 crop", () => {
    const leadAssetNo1251 = {
      ...leadAsset,
      crop32: null,
      crop169: null,
      crop1251: null
    };
    expect(getStandardTemplateCrop(leadAssetNo1251).ratio).toEqual("1:1");
  });

  it("return the 4:5 crop", () => {
    const leadAssetNo11 = {
      ...leadAsset,
      crop11: null,
      crop32: null,
      crop169: null,
      crop1251: null
    };
    expect(getStandardTemplateCrop(leadAssetNo11).ratio).toEqual("4:5");
  });

  it("return the 2:3 crop", () => {
    const leadAssetNo23 = {
      ...leadAsset,
      crop11: null,
      crop32: null,
      crop45: null,
      crop169: null,
      crop1251: null
    };
    expect(getStandardTemplateCrop(leadAssetNo23).ratio).toEqual("2:3");
  });
});
