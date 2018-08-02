import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import Image from "../src";
import Placeholder from "../src/placeholder";

const props = {
  aspectRatio: 3 / 2,
  uri: "http://example.com/image.jpg"
};

export default (renderComponent, platformTests = []) => {
  const tests = [
    {
      name: "default layout",
      test: () => {
        const output = renderComponent(
          <Image aspectRatio={3 / 2} uri="http://example.com/image.jpg" />
        );
        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "default layout without uri",
      test: () => {
        const output = renderComponent(<Image aspectRatio={3 / 2} />);

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "handle layout change",
      test() {
        const testInstance = TestRenderer.create(<Image {...props} />);

        const placeholder = testInstance.root.find(
          node => node.type === Placeholder
        );

        placeholder.instance.handleLayout({
          nativeEvent: { layout: { width: 600 } }
        });

        expect(testInstance).toMatchSnapshot();
      }
    },
    ...platformTests
  ];

  iterator(tests);
};
