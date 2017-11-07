/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";
import Image from "../image";

it("renders correctly", () => {
  const tree = renderer
    .create(<Image uri="http://example.com/image.jpg" aspectRatio={1 / 1} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("allows styling", () => {
  const tree = renderer
    .create(
      <Image
        style={{ width: 100 }}
        uri="http://example.com/image.jpg"
        aspectRatio={1 / 1}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("prepends https schema", () => {
  const tree = renderer
    .create(<Image uri="//example.com/image.jpg" aspectRatio={1 / 1} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
