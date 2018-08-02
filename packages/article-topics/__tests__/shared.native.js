import {
  addSerializers,
  compose,
  minimalNativeTransform,
  minimaliseTransform,
  print
} from "@times-components/jest-serializer";

import shared from "./shared.base";

const omitProps = new Set([
  "nativeBackgroundAndroid",
  "pointerEvents",
  "style"
]);

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform((value, key) => omitProps.has(key))
    )
  );

  shared();
};
