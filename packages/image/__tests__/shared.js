/* global context */
import "react-native";
import React from "react";
import { shallow } from "enzyme";
import Image from "../src";
import Placeholder from "../src/placeholder";

jest.mock("@times-components/gradient", () => "Gradient");

export default () => {
  context("Image", () => {
    it("should render default layout", () => {
      const wrapper = shallow(
        <Image aspectRatio={3 / 2} uri="http://example.com/image.jpg" />
      );
      expect(wrapper).toMatchSnapshot("1. Renders default layout");
    });

    it("should render default layout without uri", () => {
      const wrapper = shallow(<Image aspectRatio={3 / 2} />);
      expect(wrapper).toMatchSnapshot("2. Renders default layout without uri");
    });

    it("should accept styling prop", () => {
      const wrapper = shallow(
        <Image
          aspectRatio={3 / 2}
          style={{ width: 100 }}
          uri="http://example.com/image.jpg"
        />
      );
      expect(wrapper).toMatchSnapshot("3. Renders with a passed style prop");
    });
  });

  context("Placeholder", () => {
    it("should render a loading image when width set", () => {
      const wrapper = shallow(<Placeholder />);
      wrapper.setState({
        width: 300
      });

      wrapper.update();
      expect(wrapper).toMatchSnapshot("4. Renders a placeholder");
    });

    it("should have an empty state when first loaded", () => {
      const wrapper = shallow(<Placeholder />);
      expect(wrapper.state()).toEqual({});
    });

    it("should handle layout width", () => {
      const wrapper = shallow(<Placeholder />);
      wrapper
        .instance()
        .handleLayout({ nativeEvent: { layout: { width: 320 } } });
      expect(wrapper.state()).toEqual({ width: 320 });
    });
  });
};
