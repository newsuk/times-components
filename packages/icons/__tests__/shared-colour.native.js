import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  justChildren,
  minimaliseTransform,
  replaceTransform,
  print
} from "@times-components/jest-serializer";
import shared from "./shared-colour.base";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      replaceTransform({
        ARTSurfaceView: justChildren,
        ARTGroup: justChildren
      }),
      flattenStyleTransform,
      minimaliseTransform((value, key) => key !== "stroke" && key !== "fill")
    )
  );

  shared(TestRenderer.create);
};
