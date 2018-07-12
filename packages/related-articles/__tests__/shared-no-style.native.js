import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";

jest.mock("@times-components/card", () => "Card");
jest.mock("@times-components/link", () => "Link");

addSerializers(
  expect,
  compose(
    print,
    minimalNativeTransform,
    minimaliseTransform(
      (value, key) =>
        key === "style" ||
        key.toLowerCase().includes("class") ||
        key === "testID"
    )
  )
);
