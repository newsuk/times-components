import {
  addSerializers,
  compose,
  print,
  minimaliseTransform,
  minimalNativeTransform
} from "@times-components/jest-serializer";
import shared from "./shared-base";
import renderComments from "./renderer";

const omitKeys = new Set([
  "data",
  "disableVirtualization",
  "horizontal",
  "onViewableItemsChanged",
  "selectable",
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

  shared();

  it("zero comments", () => {
    const testInstance = renderComments({ count: 0, enabled: true });
    expect(testInstance).toMatchSnapshot();
  });

  it("single comment", () => {
    const testInstance = renderComments({ count: 1, enabled: true });
    expect(testInstance).toMatchSnapshot();
  });
};
