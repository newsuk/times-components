import { AppRegistry } from "react-native-web";
import {
  addSerializers,
  compose,
  hoistStyleTransform,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import shared from "./shared-with-style.base";

const styles = [
  "color",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "letterSpacing",
  "lineHeight",
  "paddingTop"
];

export default () => {
  addSerializers(
    expect,
    compose(
      stylePrinter,
      minimalWebTransform,
      hoistStyleTransform,
      rnwTransform(AppRegistry, styles)
    )
  );

  shared();
};
