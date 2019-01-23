import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import TestRenderer from "react-test-renderer";
import "./mocks.native.js";
import shared from "./shared.base";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      flattenStyleTransform,
      minimalNativeTransform,
      minimaliseTransform((value, key) => key === "style")
    )
  );

  shared(component => {
    const testInstance = TestRenderer.create(component);

    return testInstance.toJSON();
  });
};
