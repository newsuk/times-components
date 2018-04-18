/* global context */
import React from "react";
import { shallow } from "enzyme";
import ModalImage from "../../src/modal-image";
import shared from "../shared";

describe("Image tests on web", () => {
  context("ModalImage", () => {
    it("passes through to Image", () => {
      const wrapper = shallow(
        <ModalImage aspectRatio={3 / 2} uri="http://example.com/image.jpg" />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  shared();
});
