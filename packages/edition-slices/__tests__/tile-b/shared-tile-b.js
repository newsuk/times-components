import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  minimaliseTransform,
  minimalWebTransform,
  hoistStyleTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import shared from "./shared-tile-b.base";

export default () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      stylePrinter,
      hoistStyleTransform,
      minimalWebTransform,
      minimaliseTransform((value, key) => key === "style")
    )
  );

  shared();
};
