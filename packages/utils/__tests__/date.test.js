/* eslint-env jest */

import { isBST, getUTCTime } from "../date";

describe("date helper", () => {
  it("2017-11-17 00:01:00 should be a GMT date", () => {
    expect(isBST(getUTCTime("2017-11-17T00:01:00.000Z"))).toEqual(false);
  });

  it("2017-05-17 00:01:00 should be a BST date", () => {
    expect(isBST(getUTCTime("2017-05-17T00:01:00.000Z"))).toEqual(true);
  });
});
