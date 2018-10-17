import { AppRegistry } from "react-native-web";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import dropCapData from "./fixtures/drop-cap-showcase.json";
import renderParagraph from "./renderer";

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      stylePrinter,
      rnwTransform(AppRegistry),
      minimalWebTransform,
      minimaliseTransform(
        (value, key) => key !== "style" && key !== "className"
      )
    )
  );

  // eslint-disable-next-line global-require
  require("jest-styled-components");

  it("paragraph with a drop cap", () => {
    expect(TestRenderer.create(renderParagraph(dropCapData))).toMatchSnapshot();
  });
};
