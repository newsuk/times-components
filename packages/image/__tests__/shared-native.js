/* global context */
import React from "react";
import { shallow } from "enzyme";
import Image, { ModalImage } from "../src";

export default () => {
  context("ModalImage", () => {
    let image;
    let modalImage;

    beforeEach(() => {
      image = shallow(
        <Image aspectRatio={3 / 2} uri="http://example.com/image.jpg" />
      );
      modalImage = shallow(
        <ModalImage aspectRatio={3 / 2} uri="http://example.com/image.jpg" />
      );
    });

    afterAll(() => {
      image = null;
      modalImage = null;
    });

    it("should handle onPress event on the link", () => {
      const imageLink = modalImage
        .dive()
        .find("Link")
        .at(1);

      imageLink.simulate("press");
      modalImage.update();

      const modal = modalImage.childAt(0);
      expect(modal.props().visible).toBe(true);
    });

    it("should handle onPress event on the close button", () => {
      modalImage.setState({ showModal: true });

      const closeButton = modalImage
        .dive()
        .find("Link")
        .at(0);
      closeButton.simulate("press");
      modalImage.update();

      const modal = modalImage.childAt(0);
      expect(modal.props().visible).toBe(false);
    });

    it("should handle onload event", () => {
      expect(image.state("isLoaded")).toEqual(false);
      image.instance().handleLoad();
      expect(image.state("isLoaded")).toEqual(true);
    });

    it("should handle handlePreviewLoad event if it exists", () => {
      expect(image.state("isLoaded")).toEqual(false);
      const { handlePreviewLoad } = image.instance();
      if (handlePreviewLoad) {
        handlePreviewLoad();
        expect(image.state("isLoaded")).toEqual(true);
      }
    });
  });
};
