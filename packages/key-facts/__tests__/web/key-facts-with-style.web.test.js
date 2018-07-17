import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import renderKeyFacts from "../shared-render-key-facts";

const styles = [
  "backgroundColor",
  "color",
  "flexDirection",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "height",
  "letterSpacing",
  "lineHeight",
  "marginBottom",
  "marginTop",
  "paddingLeft",
  "top",
  "transform",
  "width"
];

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(stylePrinter, minimalWebTransform, rnwTransform(styles))
);

const tests = [
  {
    name: "key facts with title",
    test: () => {
      const wrapper = mount(
        renderKeyFacts("New Brexit referendum")
      );

      expect(wrapper).toMatchSnapshot();
    }
  },
  {
    name: "key facts without title",
    test: () => {
      const wrapper = mount(
        renderKeyFacts()
      );

      expect(wrapper).toMatchSnapshot();
    }
  }
];

iterator(tests);
