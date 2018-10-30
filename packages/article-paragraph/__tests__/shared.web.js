import { AppRegistry } from "react-native-web";

import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";

import shared from "./shared.base";

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      stylePrinter,
      rnwTransform(AppRegistry),
      minimalWebTransform,
      minimaliseTransform(
        (value, key) => key === "style" || key === "className"
      )
    )
  );

  shared();
};
