import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  flattenStyleTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import shared from "./shared-tile-l.base";

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      print,
      minimalNativeTransform,
      flattenStyleTransform
    )
  );

  shared();
};
