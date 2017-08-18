/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import DatePublication from "./date-publication";

const props = {
  date: new Date("2017-07-01T14:32:00.000Z"),
  publication: "TIMES"
};

it("renders a DatePublication component with content", () => {
  const tree = renderer.create(<DatePublication {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a DatePublication component with red font color", () => {
  const styleProps = {
    ...props,
    style: {
      color: "red"
    }
  };
  const tree = renderer.create(<DatePublication {...styleProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});
