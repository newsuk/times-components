import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  minimalWebTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import dropCapData from "./fixtures/drop-cap-showcase.json";
import renderParagraph from "./renderer";

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      stylePrinter,
      minimalWebTransform,
      minimaliseTransform(
        (value, key) => key !== "style" && key !== "className"
      )
    )
  );

  // eslint-disable-next-line global-require
  require("jest-styled-components");

  iterator([
    {
      name: "mpu config",
      test: () => {
        expect(
          TestRenderer.create(renderParagraph(dropCapData))
        ).toMatchSnapshot();
      }
    }
  ]);
};
