import {
  addSerializers,
  compose,
  minimalNativeTransform,
  flattenStyleTransform,
  print
} from "@times-components/jest-serializer";
import shared from "./shared.base";

export default () => {
  addSerializers(
    expect,
    compose(print, minimalNativeTransform, flattenStyleTransform)
  );

  shared();
};
