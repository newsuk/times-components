import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalWebTransform,
  print
} from "@times-components/jest-serializer";
import { mockNativeModules } from "@times-components/mocks";

mockNativeModules();

jest.mock("@times-components/card", () => "Card");
jest.mock("@times-components/link", () => "Link");

addSerializers(
  expect,
  compose(
    print,
    minimalWebTransform,
    minimaliseTransform(
      (value, key) => key === "style" || key.toLowerCase().includes("class")
    )
  )
);
