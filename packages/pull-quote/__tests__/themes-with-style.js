import {
  addSerializers,
  compose,
  flattenStyleTransform,
  hoistStyleTransform,
  minimalWebTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import tests from "./themes-with-style.base";

jest.mock("@times-components/link", () => ({
  TextLink: "TextLink"
}));

jest.mock("@times-components/icons", () => ({
  IconTwitter: "IconTwitter"
}));

export default () => {
  addSerializers(
    expect,
    compose(
      stylePrinter,
      minimalWebTransform,
      flattenStyleTransform,
      hoistStyleTransform
    )
  );

  // eslint-disable-next-line global-require
  require("jest-styled-components");

  iterator(tests);
};
