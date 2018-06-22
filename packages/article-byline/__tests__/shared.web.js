import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalWebTransform,
  print,
  rnwTransform
} from "@times-components/jest-serializer";
import shared from "./shared.base";

export default Component => {
  addSerializers(
    expect,
    compose(
      print,
      minimalWebTransform,
      minimaliseTransform((value, key) => key === "style"),
      rnwTransform()
    )
  );

  shared(Component);
};
