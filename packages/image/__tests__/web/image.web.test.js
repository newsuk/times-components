/* global context */
import React from "react";
import renderer from "react-test-renderer";
import ModalImage from "../../src/modal-image";
import shared from "../shared";

describe("Image tests on web", () => {
  context("ModalImage", () => {
    it("passes through to Image", () => {
      const tree = renderer
        .create(
          <ModalImage aspectRatio={3 / 2} uri="http://example.com/image.jpg" />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  shared();
});
