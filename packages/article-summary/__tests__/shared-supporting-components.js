import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalWebTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import shared from "./shared-supporting-components.base";

export default () => {
  addSerializers(
    expect,
    compose(
      stylePrinter,
      minimaliseTransform(
        (value, key) => key === "style" || key === "data-testid"
      ),
      minimalWebTransform
    )
  );

  shared();
};
