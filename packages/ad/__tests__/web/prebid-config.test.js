import { prebidConfig } from "../../src/prebid-config";

describe("Prebid Config test", () => {
  const maxBid = 15;
  const minPrice = 0.01;
  const bucketSize = 0.25;
  const dummyValue = 99;

  const { adserverTargeting } = prebidConfig.bidderSettings({
    maxBid,
    minPrice,
    bucketSize
  });

  it("should return the correct value for the hd_bidder", () => {
    const hbBidder = adserverTargeting.filter(
      item => item.key === "hb_bidder"
    )[0];
    expect(hbBidder.val({ bidder: dummyValue })).toEqual(dummyValue);
  });

  it("should return the correct value for the hb_adid", () => {
    const bid = adserverTargeting.filter(item => item.key === "hb_adid")[0];
    expect(bid.val({ adId: dummyValue })).toEqual(dummyValue);
  });

  it("should return the correct value for the hb_pb when cpm is greater than maxBid (15)", () => {
    const bid = adserverTargeting.filter(item => item.key === "hb_pb")[0];
    expect(bid.val({ cpm: 16 })).toEqual(maxBid.toFixed(2));
  });

  it("should return the correct value for the hb_pb bid when cpm is less than bucketSize (0.25)", () => {
    const bid = adserverTargeting.filter(item => item.key === "hb_pb")[0];
    expect(bid.val({ cpm: 0.2 })).toEqual(minPrice.toFixed(2));
  });

  it("should return the correct value for the hb_pb when cpm is in the range 0.25 - 15.00", () => {
    const bid = adserverTargeting.filter(item => item.key === "hb_pb")[0];
    expect(bid.val({ cpm: 1.88 })).toEqual("1.75");
    expect(bid.val({ cpm: 1.2 })).toEqual("1.00");
    expect(bid.val({ cpm: 0.26 })).toEqual("0.25");
    expect(bid.val({ cpm: 0.81 })).toEqual("0.75");
  });

  it("should return the correct value for the hb_size bid", () => {
    const bid = adserverTargeting.filter(item => item.key === "hb_size")[0];
    expect(bid.val({ size: dummyValue })).toEqual(dummyValue);
  });
});
