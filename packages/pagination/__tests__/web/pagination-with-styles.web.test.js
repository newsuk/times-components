import React from "react";
import { AppRegistry } from "react-native-web";
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
import { iterator } from "@times-components/test-utils";
import Pagination from "../../src/pagination";

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
    rnwTransform(AppRegistry, styles),
    minimalWebTransform,
    hoistStyleTransform
  )
);

// eslint-disable-next-line global-require
require("jest-styled-components");

const tests = [
  {
    name: "renders",
    test: () => {
      const props = {
        count: 21,
        page: 2,
        pageSize: 3
      };

      const wrapper = mount(<Pagination {...props} />);

      expect(wrapper).toMatchSnapshot();
    }
  },
  {
    name: "renders with no results",
    test: () => {
      const props = {
        count: 0,
        hideResults: true,
        page: 0,
        pageSize: 0
      };

      const wrapper = mount(<Pagination {...props} />);

      expect(wrapper).toMatchSnapshot();
    }
  }
];

iterator(tests);
