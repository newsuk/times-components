import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  print
} from "@times-components/jest-serializer";
import shared from "./shared-colour.base";
import replaceLongKeys from "./utils";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      flattenStyleTransform,
      minimaliseTransform((value, key) => key === "opacity"),
      replaceLongKeys
    )
  );

  shared(TestRenderer.create);
};
