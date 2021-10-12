import { AppRegistry } from "react-native-web";
import {
  addSerializers,
  compose,
  hoistStyleTransform,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import shared from "./shared-base";

export default Component => {
  addSerializers(
    expect,
    compose(
      stylePrinter,
      hoistStyleTransform,
      minimalWebTransform,
      rnwTransform(AppRegistry)
    )
  );

  // eslint-disable-next-line global-require
  require("jest-styled-components");

  shared(Component);
};
