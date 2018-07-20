import React from "react";
import { shallow } from "enzyme";
import ModalImage from "../../src/modal-image";
import shared from "../shared";

it("modal props pass through to image", () => {
  const wrapper = shallow(
    <ModalImage aspectRatio={3 / 2} uri="http://example.com/image.jpg" />
  );
  expect(wrapper).toMatchSnapshot();
});

shared();
