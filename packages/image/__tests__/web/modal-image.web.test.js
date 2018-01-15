/* eslint-env jest */
import React from "react";
import renderer from "react-test-renderer";
import ModalImage from "../../modal-image";

it("passes through to Image", () => {
  const tree = renderer
    .create(
      <ModalImage uri="http://example.com/image.jpg" aspectRatio={3 / 2} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
