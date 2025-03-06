import {
  addSerializers,
  compose,
  hoistStyleTransform,
  minimalWebTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import shared from "./shared-with-styles.base";

export default Component => {
  addSerializers(
    expect,
    compose(
      stylePrinter,
      hoistStyleTransform,
      minimalWebTransform
    )
  );

  shared(Component);
};
