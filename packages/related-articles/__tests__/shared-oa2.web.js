import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalWebTransform,
  print
} from "@times-components/jest-serializer";
import shared from "./shared-oa2.base";

jest.mock("@times-components/card", () => "Card");
jest.mock("@times-components/link", () => "Link");

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalWebTransform,
      minimaliseTransform(
        (value, key) =>
          key === "style" ||
          key.toLowerCase().includes("class") ||
          key === "data-testid"
      )
    )
  );

  shared(TestRenderer.create);
};
