import {
  addSerializers,
  compose,
  minimalWebTransform,
  minimaliseTransform,
  print
} from "@times-components/jest-serializer";
import shared from "../ad-placeholder.shared";

describe("android", () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalWebTransform,
      minimaliseTransform((value, key) => key === "style")
    )
  );

  shared();
});
