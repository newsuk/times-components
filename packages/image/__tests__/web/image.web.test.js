/* global context */
import React from "react";
import renderer from "react-test-renderer";
import ModalImage from "../../src/modal-image";
import shared from "../shared";

describe("Image tests on web", () => {
  context("<ModalImage />", () => {
    it("passes through to Image", () => {
      const tree = renderer
        .create(
          <ModalImage uri="http://example.com/image.jpg" aspectRatio={3 / 2} />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  shared();
});
