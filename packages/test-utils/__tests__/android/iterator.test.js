import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import shared from "../shared-iterator";

addSerializers(
  expect,
  enzymeTreeSerializer(),
  compose(print, minimalNativeTransform)
);

shared();
