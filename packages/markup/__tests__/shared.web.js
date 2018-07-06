import React from "react";
import { View } from "react-native";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  flattenStyleTransform,
  hoistStyleTransform,
  justChildren,
  meltNative,
  minimalWebTransform,
  propsNoChildren,
  replaceTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import { AdComposer } from "@times-components/ad";
import { mount } from "enzyme";
import { renderTrees } from "../src/markup";
import shared from "./shared.base";

const multiParagraphWithAds = require("../fixtures/multi-paragraph-with-ads.json");

export default () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      stylePrinter,
      replaceTransform({
        Ad: propsNoChildren,
        AdComposer: justChildren,
        Broadcast: justChildren,
        PullQuotes: propsNoChildren,
        ...meltNative
      }),
      flattenStyleTransform,
      hoistStyleTransform,
      minimalWebTransform,
      rnwTransform()
    )
  );

  shared(mount);

  it("renders multiple paragraphs with ads", () => {
    const wrapper = mount(
      <AdComposer>
        <View>{renderTrees(multiParagraphWithAds)}</View>
      </AdComposer>
    );

    expect(wrapper).toMatchSnapshot("14. renders multiple paragraphs with ads");
  });
};
