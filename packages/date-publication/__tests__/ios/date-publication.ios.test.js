import rndiMock from "react-native-device-info";
import shared from "../shared";

describe("Date Publication test on iOS when the user has the same time zone as London time zone", () => {
  beforeEach(() => {
    rndiMock.setMockTimezone("Europe/London");
  });
  shared();
});

describe("Date Publication test on iOS when the user has a different time zone than London time zone", () => {
  beforeEach(() => {
    rndiMock.setMockTimezone("Europe/Kiev");
  });
  shared();
});
