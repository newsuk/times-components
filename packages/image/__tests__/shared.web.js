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
import Image from "../src";
import "./mocks";
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
      name: "an invalid uri",
      test: () => {
        const testRenderer = TestRenderer.create(
          <Image aspectRatio={3 / 2} highResSize={1400} uri="not-valid" />
        );

        expect(testRenderer).toMatchSnapshot();
      }
    },
    {
      name: "no URL in environment",
      test: () => {
        const origURL = window.URL;

        delete window.URL;

        const testInstance = TestRenderer.create(
          <Image aspectRatio={3 / 2} highResSize={1400} uri="not-valid" />
        );

        expect(testInstance).toMatchSnapshot();

        window.URL = origURL;
      }
    },
    {
      name: "with existing URL params",
      test: () => {
        const testRenderer = TestRenderer.create(
          <Image
            aspectRatio={3 / 2}
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
            aspectRatio={3 / 2}
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
          <Image aspectRatio={3 / 2} lowResSize={200} uri="https://image.io" />
        );

        expect(testRenderer).toMatchSnapshot();
      }
    },
    {
      name: "fade in the low res image",
      test: () => {
        const testRenderer = TestRenderer.create(
          <Image
            aspectRatio={3 / 2}
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
    }
  ];

  shared(TestRenderer.create, tests);
};
