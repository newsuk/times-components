import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalWebTransform,
  print,
  replacePropTransform
} from "@times-components/jest-serializer";
import { hash } from "@times-components/test-utils";
import { omitWeb as omitProps } from "./utils";
import shared from "./shared-error.base";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalWebTransform,
      minimaliseTransform((value, key) => omitProps.has(key)),
      replacePropTransform(
        (value, key) => (key === "src" ? hash(JSON.stringify(value)) : value)
      )
    )
  );

  shared();
};
