import {
  addSerializers,
  compose,
  print,
  minimaliseTransform,
  minimalNativeTransform
} from "@times-components/jest-serializer";
import "./mocks.native";
import shared from "./images.base";

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

  const realIntl = Intl;

  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: "Europe/London" })
      })
    };
  });

  afterEach(() => {
    global.Intl = realIntl;
  });

  shared();
};
