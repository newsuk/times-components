import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components-native/jest-serializer";
import { mockNativeModules } from "@times-components-native/mocks";

mockNativeModules();

jest.mock("@times-components-native/card", () => "Card");
jest.mock("@times-components-native/link", () => "Link");
jest.mock("@times-components-native/article-label", () => "ArticleLabel");

addSerializers(
  expect,
  compose(
    print,
    minimalNativeTransform,
    flattenStyleTransform,
    minimaliseTransform((value, key) => key !== "style")
  )
);
