import {
  addSerializers,
  compose,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import shared from "./shared.base";

export default () => {
  addSerializers(
    expect,
    compose(stylePrinter, minimalWebTransform, rnwTransform())
  );

  shared();
};
