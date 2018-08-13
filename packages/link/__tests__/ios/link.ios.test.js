import { Text } from "react-native";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import shared from "../shared";

addSerializers(
  expect,
  compose(print, flattenStyleTransform, minimalNativeTransform)
);

iterator(shared(Text));
