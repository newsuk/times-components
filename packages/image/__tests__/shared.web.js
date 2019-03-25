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

function createOnLayoutEventForLayout(layout) {
  return { nativeEvent: { layout } };
}

function triggerOnLayoutEvent(testRenderer, evt) {
  testRenderer.root.children[0].props.onLayout(evt);
}

function render(component) {
  const testRenderer = TestRenderer.create(component);
  triggerOnLayoutEvent(
    testRenderer,
    createOnLayoutEventForLayout({ height: 400, width: 800 })
  );

  return testRenderer;
}

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
      name: "an invalid uri",
      test: () => {
        const testRenderer = render(
          <Image aspectRatio={2} highResSize={1400} uri="not-valid" />
        );

        expect(testRenderer).toMatchSnapshot();
      }
    },
    {
      name: "no URL in environment",
      test: () => {
        const origURL = window.URL;

        delete window.URL;

        const testInstance = render(
          <Image aspectRatio={2} highResSize={1400} uri="not-valid" />
        );

        expect(testInstance).toMatchSnapshot();

        window.URL = origURL;
      }
    },
    {
      name: "with existing URL params",
      test: () => {
        const testRenderer = render(
          <Image aspectRatio={2} highResSize={1400} uri="https://image.io" />
        );

        expect(testRenderer).toMatchSnapshot();
      }
    },
    {
      name:
        "remove the low res image after the high res image has transitioned in",
      test: () => {
        const testRenderer = render(
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
        const testRenderer = render(
          <Image aspectRatio={2} lowResSize={200} uri="https://image.io" />
        );

        expect(testRenderer).toMatchSnapshot();
      }
    },
    {
      name: "fade in the low res image",
      test: () => {
        const testRenderer = render(
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
        const testRenderer = render(
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
        const testRenderer = render(
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
      name: "low res image should hide placeholder after loading",
      test: () => {
        const testRenderer = render(
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

        const evt = createOnLayoutEventForLayout({ height: 800, width: 400 });
        triggerOnLayoutEvent(testRenderer, evt);

        expect(onLayoutMock).toHaveBeenCalledWith(evt);
      }
    }
  ];

  shared(render, tests);
};
