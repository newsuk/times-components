import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimalNativeTransform,
  minimaliseTransform,
  print
} from "@times-components/jest-serializer";

addSerializers(
  expect,
  compose(
    print,
    minimalNativeTransform,
    minimaliseTransform((value, key) => key !== "style"),
    flattenStyleTransform
  )
);
