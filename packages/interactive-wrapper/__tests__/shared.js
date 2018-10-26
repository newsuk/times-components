import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import shared from "./shared.base";

const omitProps = new Set([
  "javaScriptEnabled",
  "messagingEnabled",
  "saveFormDataDisabled",
  "scalesPageToFit",
  "thirdPartyCookiesEnabled"
]);

addSerializers(
  expect,
  compose(
    print,
    flattenStyleTransform,
    minimalNativeTransform,
    minimaliseTransform((value, key) => omitProps.has(key))
  )
);

export default () => shared();
