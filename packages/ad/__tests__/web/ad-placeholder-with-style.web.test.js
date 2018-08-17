import React from "react";
import { AppRegistry } from "react-native-web";
import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  flattenStyleTransform,
  hoistStyleTransform,
  minimalWebTransform,
  propsNoChildren,
  replaceTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import AdPlaceholder from "../../src/ad-placeholder";

const style = {
  backgroundColor: "red"
};

const styles = [
  "alignItems",
  "backgroundColor",
  "borderColor",
  "borderStyle",
  "borderWidth",
  "color",
  "flex",
  "fontFamily",
  "fontSize",
  "justifyContent",
  "left",
  "letterSpacing",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  "position",
  "overflow",
  "top",
  "zIndex"
];

addSerializers(
  expect,
  enzymeTreeSerializer(),
  compose(
    stylePrinter,
    flattenStyleTransform,
    hoistStyleTransform,
    minimalWebTransform,
    replaceTransform({
      Watermark: propsNoChildren
    }),
    rnwTransform(AppRegistry, styles)
  )
);

it("advert placeholder", () => {
  const wrapper = mount(
    <AdPlaceholder height={300} style={style} width={970} />
  );

  expect(wrapper).toMatchSnapshot();
});
