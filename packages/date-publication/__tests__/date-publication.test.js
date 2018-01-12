/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import DatePublication from "../date-publication";

function gmtTests(userTimezone) {
  const realIntl = Intl;

  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: userTimezone })
      })
    };
  });

  afterEach(() => {
    global.Intl = realIntl;
  });

  it("renders a DatePublication component with Times publication and Relevant GMT date", () => {
    const tree = renderer
      .create(
        <DatePublication date="2017-01-01T14:32:00.000Z" publication="TIMES" />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a DatePublication component with default publication and Relevant GMT date", () => {
    const tree = renderer
      .create(<DatePublication date="2017-01-01T14:32:00.000Z" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a DatePublication component with default publication and Relevant BST date", () => {
    const tree = renderer
      .create(<DatePublication date="2017-07-01T14:32:00.000Z" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
}

describe("when the user have the same timezone as London timezone", () => {
  gmtTests("Europe/London");
});

describe("when the user have a different timezone than London timezone", () => {
  gmtTests("Europe/Kiev");
});
