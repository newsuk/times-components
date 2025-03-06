import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  hoistStyleTransform,
  minimaliseTransform,
  minimalWebTransform,
  stylePrinter
} from "@times-components/jest-serializer";

jest.mock("@times-components/card", () => "Card");
jest.mock("@times-components/link", () => "Link");

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(
    stylePrinter,
    minimalWebTransform,
    minimaliseTransform((value, key) => key !== "style" && key !== "className"),
    hoistStyleTransform
  )
);

// eslint-disable-next-line global-require
require("jest-styled-components");
