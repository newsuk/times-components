/* eslint-env jest */

import { Text } from "react-native";
import React from "react";
import renderer from "react-test-renderer";

export default Link => {
  it("renders correctly with specifc styles", () => {
    const tree = renderer
      .create(
        <Link url="http://thetimes.co.uk" style={{ backgroundColor: "blue" }}>
          <Text>The Times</Text>
        </Link>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with children", () => {
    const tree = renderer
      .create(
        <Link url="http://thetimes.co.uk">
          <Text>The Times</Text>
        </Link>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
};
