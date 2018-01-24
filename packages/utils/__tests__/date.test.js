/* global Intl */
import { isBST, getUTCTime, isLondonTimezone } from "../date";

describe("date helper", () => {
  it("2017-11-17 00:01:00 should be a GMT date", () => {
    expect(isBST(getUTCTime("2017-11-17T00:01:00.000Z"))).toEqual(false);
  });

  it("2017-05-17 00:01:00 should be a BST date", () => {
    expect(isBST(getUTCTime("2017-05-17T00:01:00.000Z"))).toEqual(true);
  });
});

describe("timezone helper", () => {
  it("should return true when London is the timezone", () => {
    expect(isLondonTimezone()).toEqual(true);
  });

  it("should return false when London is NOT the timezone", () => {
    Intl.DateTimeFormat = () => ({
      resolvedOptions: () => ({
        timeZone: "Somewhere/Else"
      })
    });

    expect(isLondonTimezone()).toEqual(false);
  });
});
