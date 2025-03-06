import React from "react";
import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  hoistStyleTransform,
  minimalWebTransform,
  replaceTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import Pagination from "../../src/pagination";
import "jest-styled-components";

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(
    stylePrinter,
    replaceTransform({
      svg: null
    }),
    minimalWebTransform,
    hoistStyleTransform
  )
);

const mockGenerateLink = page => `?mock-${page}`;

const tests = [
  {
    name: "renders",
    test: () => {
      const props = {
        count: 21,
        generatePageLink: mockGenerateLink,
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
        generatePageLink: mockGenerateLink,
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
