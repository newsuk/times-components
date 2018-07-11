import React from "react";
import { shallow } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  flattenStyleTransform,
  hoistStyleTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import VideoError from "../../src/video-error";

addSerializers(
  expect,
  enzymeTreeSerializer(),
  compose(
    stylePrinter,
    flattenStyleTransform,
    hoistStyleTransform
  )
);

it("1. video with error", () => {
  const wrapper = shallow(<VideoError height={100} width={100} />);
  expect(wrapper).toMatchSnapshot();
});
