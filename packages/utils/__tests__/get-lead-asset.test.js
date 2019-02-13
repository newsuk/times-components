import getLeadAsset, { defaultAsset } from "../src/get-lead-asset";

const leadAsset = {
  caption: null,
  credits: null,
  crop11: {
    ratio: "1:1",
    url:
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F1a87022a-06e6-11e9-829c-e8eb4dd44fdb.jpg?crop=2122%2C2122%2C658%2C400"
  },

  crop23: {
    ratio: "2:3",
    url:
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F5a14c64e-06db-11e9-abe2-4909b2eb0130.jpg?crop=1195%2C1792%2C747%2C0"
  },
  crop32: {
    ratio: "3:2",
    url:
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F5a14c64e-06db-11e9-abe2-4909b2eb0130.jpg?crop=2688%2C1792%2C0%2C0"
  },
  crop45: {
    ratio: "4:5",
    url:
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F5a14c64e-06db-11e9-abe2-4909b2eb0130.jpg?crop=1434%2C1792%2C627%2C0"
  },
  crop169: {
    ratio: "16:9",
    url:
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F5a14c64e-06db-11e9-abe2-4909b2eb0130.jpg?crop=2688%2C1512%2C0%2C140"
  },

  crop1251: {
    ratio: "1.25:1",
    url:
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F5a14c64e-06db-11e9-abe2-4909b2eb0130.jpg?crop=2240%2C1792%2C224%2C0"
  },

  id: "ab0b986f-d503-4c53-9ed3-b524c73a9936",
  isVideo: false,
  title: "Luton Town v Burton Albion, EFL Sky Bet League 1 - 22 Dec 2018"
};

describe("getLeadAsset should", () => {
  it("return default values if nothing is provided", () => {
    expect(getLeadAsset({ leadAsset: null })).toEqual(defaultAsset);
  });

  it("return image lead asset values", () => {
    const testLeadAssetResult = {
      aspectRatio: "16:9",
      displayImage: {
        ratio: "16:9",
        url:
          "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F5a14c64e-06db-11e9-abe2-4909b2eb0130.jpg?crop=2688%2C1512%2C0%2C140"
      },
      isVideo: false,
      leadAsset
    };

    expect(getLeadAsset({ leadAsset })).toEqual(testLeadAssetResult);
  });

  it("return video lead asset values", () => {
    const testLeadAssetResult = {
      aspectRatio: "16:9",
      displayImage: {
        ratio: "16:9",
        url:
          "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F4d3487fe-2ec5-11e9-b26a-04579b7820b3.jpg?crop=1600%2C900%2C0%2C0"
      },
      isVideo: true,
      leadAsset: {
        __typename: "Video",
        brightcoveAccountId: "5436121856001",
        brightcovePolicyKey:
          "BCpkADawqM1d6QTQTQZNvZeQPJoanIYcUVVRuuypZErRN3_-wE6wBEkRhk0JnCMFbIDR4pNtFoO6cbWqB_IL50zx9ZcSLdfMhcNAv46bQxrMyXybmBxe3BeueHE8n6I2qFRSbna8vguRIdZd",
        brightcoveVideoId: "6001145332001",
        isVideo: true,
        posterImage: {
          caption: null,
          credits: null,
          crop11: {
            ratio: "1:1",
            url:
              "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F2e48eae8-2f87-11e9-b26a-04579b7820b3.jpg?crop=629%2C629%2C374%2C155"
          },

          crop23: {
            ratio: "2:3",
            url:
              "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F4d3487fe-2ec5-11e9-b26a-04579b7820b3.jpg?crop=600%2C900%2C500%2C0"
          },
          crop32: {
            ratio: "3:2",
            url:
              "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F4d3487fe-2ec5-11e9-b26a-04579b7820b3.jpg?crop=1286%2C857%2C24%2C30"
          },
          crop45: {
            ratio: "4:5",
            url:
              "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F4d3487fe-2ec5-11e9-b26a-04579b7820b3.jpg?crop=720%2C900%2C440%2C0"
          },
          crop169: {
            ratio: "16:9",
            url:
              "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F4d3487fe-2ec5-11e9-b26a-04579b7820b3.jpg?crop=1600%2C900%2C0%2C0"
          },
          crop1251: {
            ratio: "1.25:1",
            url:
              "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F4d3487fe-2ec5-11e9-b26a-04579b7820b3.jpg?crop=1125%2C900%2C238%2C0"
          },

          id: "ee04d453-32e6-4ab3-f5b6-126ea07a3f5e",
          title: "West Indies v England - 3rd Test: Day Three"
        },

        skySports: false
      }
    };
    expect(getLeadAsset({ leadAsset: testLeadAssetResult.leadAsset })).toEqual(
      testLeadAssetResult
    );
  });
});
