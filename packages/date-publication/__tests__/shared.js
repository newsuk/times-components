import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import DatePublication from "../date-publication";

jest.mock("react-native-device-info");

function gmtTests(userTimezone) {
  const realIntl = Intl;

  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: userTimezone })
      })
    };
    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    require("react-native-device-info").setMockTimezone(userTimezone);
  });

  afterEach(() => {
    global.Intl = realIntl;
  });

  it("renders a DatePublication component with Times publication and relevant GMT date", () => {
    const tree = renderer
      .create(
        <DatePublication date="2017-01-01T14:32:00.000Z" publication="TIMES" />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a DatePublication component with default publication and relevant GMT date", () => {
    const tree = renderer
      .create(<DatePublication date="2017-01-01T14:32:00.000Z" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a DatePublication component with default publication and relevant BST date", () => {
    const tree = renderer
      .create(<DatePublication date="2017-07-01T14:32:00.000Z" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
}

function tests() {
  describe("when the user has the same time zone as London time zone", () => {
    gmtTests("Europe/London");
  });

  describe("when the user has a different time zone than London time zone", () => {
    gmtTests("Europe/Kiev");
  });
}

export default tests;
