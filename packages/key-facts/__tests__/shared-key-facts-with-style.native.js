import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  hoistStyleTransform,
  minimalNativeTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import renderKeyFacts from "./shared-render-key-facts";

export default () => {
  addSerializers(
    expect,
    compose(stylePrinter, hoistStyleTransform, minimalNativeTransform)
  );

  const tests = [
    {
      name: "key facts with title",
      test: () => {
        const testInstance = TestRenderer.create(
          renderKeyFacts("New Brexit referendum")
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "key facts without title",
      test: () => {
        const testInstance = TestRenderer.create(
          renderKeyFacts()
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
