import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimalNativeTransform,
  minimaliseTransform,
  flattenStyleTransform,
  print
} from "@times-components/jest-serializer";
import { delay } from "@times-components/test-utils";
import renderParagraph from "./renderer";
import dropCapData from "./fixtures/drop-cap-showcase.json";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      flattenStyleTransform,
      minimaliseTransform((value, key) => key !== "style")
    )
  );

  it("paragraph with a drop cap", async () => {
    const testInstance = TestRenderer.create(renderParagraph(dropCapData));
    await delay(0);
    expect(testInstance).toMatchSnapshot();
  });
};
