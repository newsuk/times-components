import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import TestRenderer from "react-test-renderer";
import shared from "./shared-with-style.base";

jest.mock("@times-components/image", () => ({
  ModalImage: "ModalImage"
}));

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      flattenStyleTransform,
      minimalNativeTransform
    )
  );

  shared(component => {
    const testInstance = TestRenderer.create(component);

    return testInstance.toJSON();
  });
};
