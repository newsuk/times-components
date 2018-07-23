import React from "react";
import { shallow } from "enzyme";
import { iterator } from "@times-components/test-utils";
import Image from "../src";
import Placeholder from "../src/placeholder";

jest.mock("@times-components/gradient", () => "Gradient");

export default () => {
  const tests = [
    {
      name: "default layout",
      test: () => {
        const wrapper = shallow(
          <Image aspectRatio={3 / 2} uri="http://example.com/image.jpg" />
        );
        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "default layout without uri",
      test: () => {
        const wrapper = shallow(<Image aspectRatio={3 / 2} />);

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "should accept styling prop",
      test: () => {
        const wrapper = shallow(
          <Image
            aspectRatio={3 / 2}
            style={{ width: 100 }}
            uri="http://example.com/image.jpg"
          />
        );

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "loading image when width set",
      test: () => {
        const wrapper = shallow(<Placeholder />);
        wrapper.setState({
          width: 300
        });

        wrapper.update();

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "empty state when first loaded",
      test: () => {
        const wrapper = shallow(<Placeholder />);

        expect(wrapper.state()).toEqual({});
      }
    },
    {
      name: "handle layout width",
      test: () => {
        const wrapper = shallow(<Placeholder />);
        wrapper
          .instance()
          .handleLayout({ nativeEvent: { layout: { width: 320 } } });

        expect(wrapper.state()).toEqual({ width: 320 });
      }
    }
  ];

  iterator(tests);
};
