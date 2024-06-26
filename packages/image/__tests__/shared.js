/* eslint-env browser */

import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalWebTransform,
  print,
  replacePropTransform
} from "@times-components/jest-serializer";
import { hash } from "@times-components/test-utils";
import "./mocks";
import shared from "./shared.base";
import Image from "../src";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalWebTransform,
      minimaliseTransform(
        (value, key) => key === "style" || key === "className"
      ),
      replacePropTransform((value, key) => (key === "d" ? hash(value) : value))
    )
  );

  // eslint-disable-next-line global-require
  require("jest-styled-components");

  const tests = [
    {
      name: "with existing URL params",
      test: () => {
        const testRenderer = TestRenderer.create(
          <Image aspectRatio={2} highResSize={1400} uri="https://image.io" />
        );

        expect(testRenderer).toMatchSnapshot();
      }
    },
    {
      name: "with disabled placeholder",
      test: () => {
        const testRenderer = TestRenderer.create(
          <Image
            aspectRatio={2}
            disablePlaceholder
            highResSize={1400}
            uri="https://image.io"
          />
        );

        expect(testRenderer).toMatchSnapshot();
      }
    },
    {
      name: "calls onLayout",
      test: () => {
        const onLayoutMock = jest.fn();
        const testRenderer = TestRenderer.create(
          <Image
            aspectRatio={2}
            onLayout={onLayoutMock}
            uri="https://image.io"
          />
        );

        const evt = { event: { layout: { height: "800px", width: "400px" } } };
        testRenderer.root.children[0].props.onLayout(evt);

        expect(onLayoutMock).toHaveBeenCalledWith(evt);
      }
    },
    {
      name: "to have the lcpItem class",
      test: () => {
        const testRenderer = TestRenderer.create(
          <Image
            aspectRatio={2}
            highResSize={1400}
            uri="https://image.io"
            isLcpItem
          />
        );

        const lcpImageItem = testRenderer.root.findByType("div");

        expect(lcpImageItem.props.className.includes("lcpItem")).toBe(true);
      }
    },
    {
      name: "to not have the lcpItem class",
      test: () => {
        const testRenderer = TestRenderer.create(
          <Image aspectRatio={2} highResSize={1400} uri="https://image.io" />
        );

        const lcpImageItem = testRenderer.root.findByType("div");

        expect(lcpImageItem.props.className.includes("lcpItem")).toBe(false);
      }
    }
  ];

  shared(TestRenderer.create, tests);
};
