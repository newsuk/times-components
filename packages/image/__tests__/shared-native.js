/* global context */
import React from "react";
import { shallow } from "enzyme";
import Image, { ModalImage } from "../src";

export default () => {
  context("Native only", () => {
    const props = {
      aspectRatio: 3 / 2,
      uri: "http://example.com/image.jpg"
    };

    it("should return image url with a correctly formatted query string", () => {
      const wrapper = shallow(<Image {...props} />);
      expect(wrapper.find("ImageBackground").props().source.uri).toEqual(
        "http://example.com/image.jpg?resize=1440"
      );
    });

    it("should return a data image url without a query string", () => {
      const dataUri =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      const wrapper = shallow(<Image {...props} uri={dataUri} />);
      expect(wrapper.find("ImageBackground").props().source.uri).toEqual(
        dataUri
      );
    });

    it("should handle onPress event on the link", () => {
      const wrapper = shallow(<ModalImage {...props} />);
      const imageLink = wrapper
        .dive()
        .find("Link")
        .at(1);

      imageLink.simulate("press");
      wrapper.update();

      const modal = wrapper.childAt(0);
      expect(modal.props().visible).toBe(true);
    });

    it("should handle onPress event on the close button", () => {
      const wrapper = shallow(<ModalImage {...props} />);
      wrapper.setState({ showModal: true });

      const closeButton = wrapper
        .dive()
        .find("Link")
        .at(0);
      closeButton.simulate("press");
      wrapper.update();

      const modal = wrapper.childAt(0);
      expect(modal.props().visible).toBe(false);
    });

    it("should show as not loaded when first created", () => {
      const wrapper = shallow(<Image {...props} />);
      expect(wrapper.state("isLoaded")).toEqual(false);
    });

    it("should handle onload event", () => {
      const wrapper = shallow(<Image {...props} />);
      wrapper.instance().handleLoad();
      expect(wrapper.state("isLoaded")).toEqual(true);
    });

    it("should handle handlePreviewLoad event if it exists", () => {
      const wrapper = shallow(<Image {...props} />);
      const { handlePreviewLoad } = wrapper.instance();
      if (handlePreviewLoad) {
        handlePreviewLoad();
        expect(wrapper.state("isLoaded")).toEqual(true);
      }
    });

    it("should prepend https schema", () => {
      const wrapper = shallow(
        <Image {...props} uri="//example.com/image.jpg" />
      );
      expect(wrapper).toMatchSnapshot("5. Renders with prepended https schema");
    });
  });
};
