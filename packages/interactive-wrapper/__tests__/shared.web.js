import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimalWebTransform,
  print
} from "@times-components/jest-serializer";
import shared from "./shared.base";

addSerializers(
  expect,
  compose(
    print,
    flattenStyleTransform,
    minimalWebTransform
  )
);

export default () => shared();
