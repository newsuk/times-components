/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Caption from "./caption";

const captionText = "Some caption text goes in here";
const credits = "Just credits";

it("renders correctly without credits", () => {
  const tree = renderer.create(<Caption text={captionText} />).toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders correctly with credits", () => {
  const tree = renderer
    .create(<Caption text={captionText} credits={credits} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
