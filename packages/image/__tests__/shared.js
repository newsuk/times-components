/* global context */
import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Image from "../src";
import Placeholder from "../src/placeholder";

export default () => {
  context("Image", () => {
    it("should render default layout", () => {
      const tree = renderer
        .create(
          <Image aspectRatio={3 / 2} uri="http://example.com/image.jpg" />
        )
        .toJSON();
      expect(tree).toMatchSnapshot("1. Renders default layout");
    });

    it("should render default layout without uri", () => {
      const tree = renderer.create(<Image aspectRatio={3 / 2} />).toJSON();
      expect(tree).toMatchSnapshot("2. Renders default layout without uri");
    });

    it("should accept styling prop", () => {
      const tree = renderer
        .create(
          <Image
            aspectRatio={3 / 2}
            style={{ width: 100 }}
            uri="http://example.com/image.jpg"
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot("3. Renders with a passed style prop");
    });

    it("should prepend https schema", () => {
      const tree = renderer
        .create(<Image aspectRatio={3 / 2} uri="//example.com/image.jpg" />)
        .toJSON();
      expect(tree).toMatchSnapshot("4. Renders with prepended https schema");
    });
  });

  context("Placeholder", () => {
    it("should render a loading image when width set", () => {
      const wrapper = shallow(<Placeholder />);
      wrapper.setState({
        width: 300
      });

      wrapper.update();
      expect(wrapper).toMatchSnapshot("5. Renders a placeholder");
    });

    it("should render component and handle layout width", () => {
      const wrapper = shallow(<Placeholder />);
      expect(wrapper.state()).toEqual({});
      wrapper
        .instance()
        .handleLayout({ nativeEvent: { layout: { width: 320 } } });
      expect(wrapper.state()).toEqual({ width: 320 });
    });
  });
};
