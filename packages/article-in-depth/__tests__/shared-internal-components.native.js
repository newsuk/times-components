import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  print,
  minimaliseTransform,
  minimalNativeTransform
} from "@times-components/jest-serializer";
import "./mocks.native";
import shared from "./shared-internal-components.base";

const omitKeys = new Set([
  "ListHeaderComponent",
  "data",
  "disableVirtualization",
  "horizontal",
  "onViewableItemsChanged",
  "style",
  "testID",
  "viewabilityConfig",
  "viewabilityConfigCallbackPairs"
]);

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform((value, key) => omitKeys.has(key))
    )
  );

  shared(TestRenderer.create);
};
