import { iterator } from "@times-components/test-utils";

import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  minimalWebTransform,
  stylePrinter
} from "@times-components/jest-serializer";

import shared from "./shared.base";

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      stylePrinter,
      minimalWebTransform,
      minimaliseTransform(
        (value, key) => key === "style" || key === "className"
      )
    )
  );

  iterator(shared());
};
