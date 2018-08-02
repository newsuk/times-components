import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  print
} from "@times-components/jest-serializer";
import shared from "./shared-with-style.base";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimaliseTransform((value, key) => key !== "style"),
      flattenStyleTransform
    )
  );

  shared();
};
