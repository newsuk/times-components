import {
  addSerializers,
  compose,
  minimalWebTransform,
  minimaliseTransform,
  print
} from "@times-components/jest-serializer";

import shared from "./shared.base";

const omitProps = new Set(["className", "style"]);

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalWebTransform,
      minimaliseTransform((value, key) => omitProps.has(key))
    )
  );

  shared();
};
