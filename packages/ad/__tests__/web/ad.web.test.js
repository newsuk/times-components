import {
  addSerializers,
  compose,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import shared from "../ad.shared";

describe("web", () => {
  addSerializers(
    expect,
    compose(stylePrinter, minimalWebTransform, rnwTransform())
  );

  shared();
});
