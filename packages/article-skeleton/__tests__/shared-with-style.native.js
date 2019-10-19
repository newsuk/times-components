/* eslint-disable global-require */
import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  print,
  minimaliseTransform,
  minimalNativeTransform
} from "@times-components/jest-serializer";
import "./mocks.native";
import Responsive from "@times-components/responsive";
import { Dimensions } from "react-native";
import { tabletWidth } from "@times-components/styleguide";
import { FontStorage } from "@times-components/typeset";
import articleFixture from "../fixtures/full-article";
import shared, { renderArticle, fixtureArgs } from "./shared.base";

FontStorage.registerFont(
  "TimesDigitalW04-Normal",
  () => require("@times-components/test-utils").TestFont
);
FontStorage.registerFont(
  "TimesDigitalW04-Bold",
  () => require("@times-components/test-utils").TestFont
);
FontStorage.registerFont(
  "TimesDigitalW04-Italic",
  () => require("@times-components/test-utils").TestFont
);
FontStorage.registerFont(
  "TimesModern-Regular",
  () => require("@times-components/test-utils").TestFont
);

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform((value, key) => key !== "style"),
      flattenStyleTransform
    )
  );

  const tests = [
    {
      name: "an Article Skeleton with responsive items",
      test() {
        Dimensions.set({
          window: {
            width: tabletWidth,
            height: 640
          }
        });

        const article = articleFixture({ ...fixtureArgs });
        const testInstance = TestRenderer.create(
          <Responsive>{renderArticle(article)}</Responsive>
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  shared(TestRenderer.create, tests);
};
