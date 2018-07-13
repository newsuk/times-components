import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimalWebTransform,
  print,
  rnwTransform
} from "@times-components/jest-serializer";
import shared from "../shared-iterator";

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(print, minimalWebTransform, rnwTransform())
);

shared();
