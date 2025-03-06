import {
  addSerializers,
  compose,
  hoistStyleTransform,
  minimalWebTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import shared from "./shared-supporting-components.base";

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
