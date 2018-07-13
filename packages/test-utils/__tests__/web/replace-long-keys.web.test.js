import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimalWebTransform,
  print,
  rnwTransform
} from "@times-components/jest-serializer";
import { replaceLongKeys } from "../../src/index";
import shared from "../shared-replace-long-keys";

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(
    print,
    minimalWebTransform,
    rnwTransform(),
    replaceLongKeys(new Set(["longKeyExample", "longKeyExampleTwo"]))
  )
);

shared();
