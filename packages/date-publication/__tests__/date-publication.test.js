/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import DatePublication from "../date-publication";

describe("Date Publication test", () => {
  const props = {
    date: new Date("2017-07-01T14:32:00.000Z"),
    publication: "TIMES"
  };

  it("renders a DatePublication component with full content", () => {
    const tree = renderer.create(<DatePublication {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
