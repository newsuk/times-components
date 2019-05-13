import React from "react";
import { iterator } from "@times-components/test-utils";
import Image from "../src";

const props = {
  aspectRatio: 2,
  highResSize: 800,
  uri: "http://example.com/image.jpg?crop=1016%2C677%2C0%2C0"
};

export default (renderComponent, platformTests = []) => {
  const tests = [
    {
      name: "default layout",
      test: () => {
        const output = renderComponent(
          <Image
            aspectRatio={2}
            highResSize={1000}
            uri="http://example.com/image.jpg?crop=1016%2C677%2C0%2C0"
          />
        );
        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "default layout without uri",
      test: () => {
        const output = renderComponent(
          <Image aspectRatio={props.aspectRatio} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "default layout without aspect ratio",
      test: () => {
        const output = renderComponent(
          <Image uri="http://example.com/image.jpg?crop=1016%2C677%2C0%2C0" />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "rounded image",
      test: () => {
        const testRenderer = renderComponent(<Image {...props} rounded />);
        expect(testRenderer).toMatchSnapshot();
      }
    },
    ...platformTests
  ];

  iterator(tests);
};
