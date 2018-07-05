import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  print,
  propsNoChildren,
  replaceTransform
} from "@times-components/jest-serializer";
import shared from "./shared-dim.base";
import replaceLongKeys from "./utils";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      replaceTransform({
        ARTSurfaceView: propsNoChildren
      }),
      flattenStyleTransform,
      minimaliseTransform((value, key) => key === "opacity"),
      replaceLongKeys
    )
  );

  shared(TestRenderer.create);
};
