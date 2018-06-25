import {
  addSerializers,
  compose,
  minimalWebTransform,
  print,
  rnwTransform
} from "@times-components/jest-serializer";
import shared from "../ad-placeholder.shared";

describe("web", () => {
  addSerializers(expect, compose(print, minimalWebTransform, rnwTransform()));

  shared();
});
