/* global Intl */
import { isLondonTimezone } from "../src/date";
import "./mock-timezone-non-london";

describe("timezone helper", () => {
  const realIntl = Intl;

  afterEach(() => {
    global.Intl = realIntl;
  });

  it("should return false when London is NOT the timezone", () => {
    expect(isLondonTimezone()).toEqual(false);
  });
});
