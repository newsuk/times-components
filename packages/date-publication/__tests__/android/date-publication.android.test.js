import tests from "../shared";
// eslint-disable-next-line import/no-extraneous-dependencies
const rndiMock = require("react-native-device-info");

jest.mock("react-native-device-info");

describe("Date Publication test on Android when the user has the same time zone as London time zone", () => {
  beforeEach(() => {
    rndiMock.setMockTimezone("Europe/London");
  });
  tests();
});

describe("Date Publication test on Android when the user has a different time zone than London time zone", () => {
  beforeEach(() => {
    rndiMock.setMockTimezone("Europe/Kiev");
  });
  tests();
});
