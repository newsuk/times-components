import {
  addSerializers,
  compose,
  hoistStyleTransform,
  minimalWebTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import shared from "./shared-with-style.base";

export default () => {
  addSerializers(
    expect,
    compose(
      stylePrinter,
      hoistStyleTransform,
      minimalWebTransform
    )
  );

  shared();
};
