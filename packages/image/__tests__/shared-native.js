/* global context */
import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import ModalImage from "../src/modal-image";

export default () => {
  context("<ModalImage />", () => {
    it("should render", () => {
      const tree = renderer
        .create(
          <ModalImage aspectRatio={3 / 2} uri="http://example.com/image.jpg" />
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it("should show a modal on click", () => {
      const component = shallow(
        <ModalImage aspectRatio={3 / 2} uri="http://example.com/image.jpg" />
      );

      const imageLink = component
        .dive()
        .find("Link")
        .at(1);

      imageLink.simulate("press");
      component.update();

      const modal = component.childAt(0);
      expect(modal.props().visible).toBe(true);
    });

    it("should close a modal on click", () => {
      const component = shallow(
        <ModalImage aspectRatio={3 / 2} uri="http://example.com/image.jpg" />
      );
      component.setState({ showModal: true });

      const closeButton = component
        .dive()
        .find("Link")
        .at(0);
      closeButton.simulate("press");
      component.update();

      const modal = component.childAt(0);
      expect(modal.props().visible).toBe(false);
    });
  });
};
