import React from "react";
import { iterator } from "@times-components/test-utils";
import Image from "../src";

const props = {
  aspectRatio: 2,
  highResSize: 800,
  uri: "http://example.com/image.jpg?crop=1016%2C677%2C0%2C0",
  relativeWidth: 0.5,
  relativeHeight: 0.4,
  relativeHorizontalOffset: 0.16666666666666666,
  relativeVerticalOffset: 0.2
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
            relativeWidth={0.5}
            relativeHeight={0.4}
            relativeHorizontalOffset={0.16666666666666666}
            relativeVerticalOffset={0.2}
          />
        );
        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "default layout without uri",
      test: () => {
        const output = renderComponent(
          <Image
            aspectRatio={props.aspectRatio}
            relativeWidth={0.5}
            relativeHeight={0.4}
            relativeHorizontalOffset={0.16666666666666666}
            relativeVerticalOffset={0.2}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "default layout without aspect ratio",
      test: () => {
        const output = renderComponent(
          <Image
            uri="http://example.com/image.jpg?crop=1016%2C677%2C0%2C0"
            relativeWidth={0.5}
            relativeHeight={0.4}
            relativeHorizontalOffset={0.16666666666666666}
            relativeVerticalOffset={0.2}
          />
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
