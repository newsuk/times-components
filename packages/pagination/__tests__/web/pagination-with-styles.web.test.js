import React from "react";
import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  hoistStyleTransform,
  minimalWebTransform,
  replaceTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import Pagination from "../../src/pagination";

describe("web", () => {
  const styles = [
    "alignItems",
    "color",
    "height",
    "flexDirection",
    "fontFamily",
    "fontSize",
    "marginRight",
    "paddingTop",
    "paddingVertical",
    "textAlign"
  ];

  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      stylePrinter,
      replaceTransform({
        svg: null
      }),
      rnwTransform(styles),
      minimalWebTransform,
      hoistStyleTransform
    )
  );

  // eslint-disable-next-line global-require
  require("jest-styled-components");

  it("renders", () => {
    const props = {
      count: 21,
      page: 2,
      pageSize: 3
    };

    const wrapper = mount(<Pagination {...props} />);

    expect(wrapper).toMatchSnapshot("1. renders");
  });

  it("renders without results", () => {
    const props = {
      count: 0,
      hideResults: true,
      page: 0,
      pageSize: 0
    };

    const wrapper = mount(<Pagination {...props} />);

    expect(wrapper).toMatchSnapshot("2. renders without results");
  });
});
