import React from "react";
import { shallow } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  flattenStyleTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import iterator from "@times-components/test-utils";
import VideoLabel from "../src/video-label";

export default () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(print, minimalNativeTransform, flattenStyleTransform)
  );

  const tests = [
    {
      name: "video label with a title",
      test: () => {
        const wrapper = shallow(
          <VideoLabel color="#008347" title="swimming" />
        );

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "video label without a title shows VIDEO",
      test: () => {
        const wrapper = shallow(<VideoLabel color="#008347" />);

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "video label with the black default colour",
      test: () => {
        const wrapper = shallow(<VideoLabel />);

        expect(wrapper).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
