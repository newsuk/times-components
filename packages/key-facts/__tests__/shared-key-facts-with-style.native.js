import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  hoistStyleTransform,
  minimalNativeTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import renderKeyFacts from "./shared-render-key-facts";

export default () => {
  addSerializers(
    expect,
    compose(stylePrinter, hoistStyleTransform, minimalNativeTransform)
  );

  renderKeyFacts(TestRenderer.create);
};
