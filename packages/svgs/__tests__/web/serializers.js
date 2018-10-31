import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimalWebTransform,
  print,
  replacePropTransform
} from "@times-components/jest-serializer";
import { hash } from "@times-components/test-utils";

const longValues = new Set(["points"]);

addSerializers(
  expect,
  compose(
    print,
    flattenStyleTransform,
    minimalWebTransform,
    replacePropTransform(
      (value, key) =>
        longValues.has(key) ? hash(JSON.stringify(value)) : value
    )
  )
);
