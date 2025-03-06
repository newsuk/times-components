import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalWebTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import shared from "./shared.base";

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
