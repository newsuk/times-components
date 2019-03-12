import { AppRegistry } from "react-native-web";
import {
  addSerializers,
  compose,
  hoistStyleTransform,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import shared from "./shared-supporting-components.base";

export default () => {
  addSerializers(
    expect,
    compose(
      stylePrinter,
      hoistStyleTransform,
      rnwTransform(AppRegistry, [
        "color",
        "flexWrap",
        "fontFamily",
        "fontSize",
        "fontWeight",
        "lineHeight",
        "marginBottom"
      ]),
      minimalWebTransform
    )
  );

  shared();
};
