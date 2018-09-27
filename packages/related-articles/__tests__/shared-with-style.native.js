import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import { mockNativeModules } from "@times-components/test-utils";

mockNativeModules();

jest.mock("@times-components/card", () => "Card");
jest.mock("@times-components/link", () => "Link");

addSerializers(
  expect,
  compose(
    print,
    minimalNativeTransform,
    flattenStyleTransform,
    minimaliseTransform((value, key) => key !== "style")
  )
);
