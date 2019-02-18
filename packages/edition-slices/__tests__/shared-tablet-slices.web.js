import { AppRegistry } from "react-native-web";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  minimaliseTransform,
  minimalWebTransform,
  print,
  rnwTransform
} from "@times-components/jest-serializer";
import shared from "./shared-tablet-slices.base";

export default () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      print,
      minimalWebTransform,
      minimaliseTransform(
        (value, key) => key === "style" || key === "className" || key === "tile"
      ),
      rnwTransform(AppRegistry)
    )
  );

  shared();
};
