import { AppRegistry } from "react-native-web";
import {
  addSerializers,
  compose,
  hoistStyleTransform,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import shared from "./shared-with-styles.base";

export default Component => {
  addSerializers(
    expect,
    compose(
      stylePrinter,
      hoistStyleTransform,
      minimalWebTransform,
      rnwTransform(AppRegistry, [
        "fontSize",
        "fontFamily",
        "color",
        "lineHeight",
        "flexDirection"
      ])
    )
  );

  shared(Component);
};
