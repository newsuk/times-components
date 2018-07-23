import React, { Fragment } from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import adConfig from "../fixtures/article-ad-config.json";
import Ad, { AdComposer } from "../src/ad";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimaliseTransform((value, key) => key === "style"),
      minimalNativeTransform,
      flattenStyleTransform
    )
  );

  const articleContextURL =
    "https://www.thetimes.co.uk/edition/news/france-defies-may-over-russia-37b27qd2s";

  const tests = [
    {
      name: "one ad slot",
      test: () => {
        const testInstance = TestRenderer.create(
          <AdComposer adConfig={adConfig}>
            <Ad
              contextUrl={articleContextURL}
              section="news"
              slotName="header"
            />
          </AdComposer>
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "two ad slots",
      test: () => {
        const testInstance = TestRenderer.create(
          <AdComposer adConfig={adConfig}>
            <Fragment>
              <Ad
                contextUrl={articleContextURL}
                section="news"
                slotName="header"
              />
              <Ad
                contextUrl={articleContextURL}
                section="news"
                slotName="intervention"
              />
            </Fragment>
          </AdComposer>
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "ad placeholder when isLoading prop is true",
      test: () => {
        const testInstance = TestRenderer.create(
          <AdComposer adConfig={adConfig}>
            <Ad
              contextUrl={articleContextURL}
              isLoading
              section="news"
              slotName="header"
            />
          </AdComposer>
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
