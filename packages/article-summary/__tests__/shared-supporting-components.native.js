import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import shared from "./shared-supporting-components.base";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimaliseTransform((value, key) => key === "style" || key === "testID"),
      minimalNativeTransform
    )
  );

  shared();
};
