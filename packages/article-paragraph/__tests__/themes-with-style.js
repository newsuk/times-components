import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  minimalWebTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import tests from "./themes-with-style.base";

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

  iterator(tests);
};
