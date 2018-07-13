import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  print
} from "@times-components/jest-serializer";
import { replaceLongKeys } from "@times-components/test-utils";
import shared from "./shared.base";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      flattenStyleTransform,
      minimaliseTransform((value, key) => key === "opacity"),
      replaceLongKeys(new Set(["d", "viewBox", "points"]))
    )
  );

  shared(TestRenderer.create);
};
