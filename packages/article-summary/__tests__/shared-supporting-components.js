import { AppRegistry } from "react-native-web";
import {
  addSerializers,
  compose,
  minimaliseTransform,
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
      minimaliseTransform(
        (value, key) => key === "style" || key === "data-testid"
      ),
      minimalWebTransform,
      rnwTransform(AppRegistry)
    )
  );

  shared();
};
