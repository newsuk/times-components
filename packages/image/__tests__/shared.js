/* global context */
import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Image from "../src/image";
import Placeholder from "../src/placeholder";

export default () => {
  context("<Image />", () => {
    it("should render", () => {
      const tree = renderer
        .create(
          <Image
            aspectRatio={3 / 2}
            style={{ width: 100 }}
            uri="http://example.com/image.jpg"
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("should prepend an https schema", () => {
      const tree = renderer
        .create(<Image aspectRatio={3 / 2} uri="//example.com/image.jpg" />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  context("<Placeholder />", () => {
    it("should render a loading image when width set", () => {
      const wrapper = shallow(<Placeholder />);
      wrapper.setState({
        width: 300
      });

      wrapper.update();
      expect(wrapper).toMatchSnapshot();
    });

    it("should render a component and handles layout width", done => {
      const component = new Placeholder();

      component.setState = ({ width }) => {
        expect(width).toEqual(320);

        return done();
      };

      component.handleLayout({ nativeEvent: { layout: { width: 320 } } });
    });
  });
};
