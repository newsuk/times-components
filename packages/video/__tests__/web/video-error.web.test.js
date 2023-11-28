import React from "react";
import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  minimalWebTransform,
  print
} from "@times-components/jest-serializer";
import VideoError from "../../src/video-error";

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(
    print,
    minimalWebTransform,
    minimaliseTransform((value, key) => key === "style" || key === "className")
  )
);

it("1. video with error", () => {
  const wrapper = mount(<VideoError height={100} width={100} />);
  expect(wrapper).toMatchSnapshot();
});
