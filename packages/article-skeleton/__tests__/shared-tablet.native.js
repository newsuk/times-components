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
import articleFixture from "../fixtures/full-article";
import { iterator } from "@times-components/test-utils";
import { renderArticle, fixtureArgs } from "./shared.base";

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
      name: "with inline video",
      test: async () => {

        const article = articleFixture({
          ...fixtureArgs,
          content: [
            {
              attributes: {
                brightcoveAccountId: "57838016001",
                brightcovePolicyKey: "1.2.3.4",
                brightcoveVideoId: "4084164751001",
                caption: "This is video caption",
                display: "primary",
                posterImageId: "0c0309d4-1aeb-11e8-9010-1eef6ba5d3de",
                posterImageUrl: "https://image.io"
              },
              children: [],
              name: "video"
            },
          ]
        });
        
        const testInstance = TestRenderer.create(
          <Responsive>{renderArticle(article, undefined, true)}</Responsive>
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
