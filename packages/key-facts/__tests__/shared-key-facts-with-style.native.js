import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  hoistStyleTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import renderKeyFacts from "./shared-render-key-facts";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      flattenStyleTransform,
      hoistStyleTransform
    )
  );

  renderKeyFacts(TestRenderer.create);
};
