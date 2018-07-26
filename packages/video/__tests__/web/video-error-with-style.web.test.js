import React from "react";
import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  flattenStyleTransform,
  hoistStyleTransform,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import VideoError from "../../src/video-error";

const styles = [
  "alignItems",
  "backgroundColor",
  "color",
  "display",
  "fontFamily",
  "fontSize",
  "height",
  "justifyContent",
  "marginBottom",
  "maxWidth",
  "textAlign",
  "width"
];

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(
    stylePrinter,
    flattenStyleTransform,
    hoistStyleTransform,
    minimalWebTransform,
    rnwTransform(styles)
  )
);

it("1. video with error", () => {
  const wrapper = mount(<VideoError height={100} width={100} />);
  expect(wrapper).toMatchSnapshot();
});
