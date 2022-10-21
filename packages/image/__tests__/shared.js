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
import Image from "../src";
import Placeholder from "../src/placeholder";
import shared from "./shared.base";

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
      name:
        "remove the low res image after the high res image has transitioned in",
      test: () => {
        const testRenderer = TestRenderer.create(
          <Image
            aspectRatio={2}
            highResSize={1400}
            lowResSize={200}
            uri="https://image.io"
          />
        );

        const [highResImage] = testRenderer.root.findAllByType("img");

        highResImage.props.onLoad();

        expect(testRenderer).toMatchSnapshot();

        highResImage.props.onTransitionEnd();

        expect(testRenderer).toMatchSnapshot();
      }
    },
    {
      name: "only a low res image",
      test: () => {
        const testRenderer = TestRenderer.create(
          <Image aspectRatio={2} lowResSize={200} uri="https://image.io" />
        );

        expect(testRenderer).toMatchSnapshot();
      }
    },
    {
      name: "fade in the low res image",
      test: () => {
        const testRenderer = TestRenderer.create(
          <Image
            aspectRatio={2}
            fadeImageIn
            lowResSize={200}
            uri="https://image.io"
          />
        );

        const lowResImage = testRenderer.root.findByType("img");

        expect(testRenderer).toMatchSnapshot();

        lowResImage.props.onLoad();

        expect(testRenderer).toMatchSnapshot();
      }
    },
    {
      name: "both high and low res sizes",
      test: () => {
        const testRenderer = TestRenderer.create(
          <Image
            aspectRatio={2}
            highResSize={900}
            lowResSize={200}
            uri="https://image.io"
          />
        );

        expect(testRenderer).toMatchSnapshot();
      }
    },
    {
      name: "high res image should hide placeholder after loading",
      test: () => {
        const testRenderer = TestRenderer.create(
          <Image aspectRatio={2} highResSize={900} uri="https://image.io" />
        );

        let numberOfPlaceholders = testRenderer.root.findAllByType(Placeholder)
          .length;
        expect(numberOfPlaceholders).toBe(1);

        const highResImage = testRenderer.root.findByType("img");
        highResImage.props.onLoad();

        numberOfPlaceholders = testRenderer.root.findAllByType(Placeholder)
          .length;
        expect(numberOfPlaceholders).toBe(0);
      }
    },
    {
      name: "low res image should hide placeholder after loading ",
      test: () => {
        const testRenderer = TestRenderer.create(
          <Image aspectRatio={2} lowResSize={200} uri="https://image.io" />
        );

        let numberOfPlaceholders = testRenderer.root.findAllByType(Placeholder)
          .length;
        expect(numberOfPlaceholders).toBe(1);

        const lowResImage = testRenderer.root.findByType("img");
        lowResImage.props.onLoad();

        numberOfPlaceholders = testRenderer.root.findAllByType(Placeholder)
          .length;
        expect(numberOfPlaceholders).toBe(0);
      }
    },
    {
      name: "calls onLayout",
      test: () => {
        const onLayoutMock = jest.fn();
        const testRenderer = TestRenderer.create(
          <Image
            aspectRatio={2}
            lowResSize={200}
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
            lowResSize={200}
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
          <Image
            aspectRatio={2}
            highResSize={1400}
            lowResSize={200}
            uri="https://image.io"
          />
        );

        const lcpImageItem = testRenderer.root.findByType("div");

        expect(lcpImageItem.props.className.includes("lcpItem")).toBe(false);
      }
    }
  ];

  shared(TestRenderer.create, tests);
};
