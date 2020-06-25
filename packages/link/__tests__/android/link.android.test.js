import { Text } from "react-native";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimalNativeTransform,
  print
} from "@times-components-native/jest-serializer";
import { iterator } from "@times-components-native/test-utils";
import shared from "../shared";

addSerializers(
  expect,
  compose(
    print,
    flattenStyleTransform,
    minimalNativeTransform
  )
);

iterator(shared(Text));
