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

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      replaceTransform({
        ARTSurfaceView: propsNoChildren,
        RNSVGPath: propsNoChildren,
        RNSVGSvgView: propsNoChildren
      }),
      flattenStyleTransform,
      minimaliseTransform((value, key) => key === "opacity")
    )
  );

  shared(TestRenderer.create);
};
