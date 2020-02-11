import { AppRegistry } from "react-native-web";
import {
  addSerializers,
  compose,
  hoistStyleTransform,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import React from "react";
import { View } from "react-native";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import authorsFixture from "../fixtures/authors.json";
import shared from "./shared-with-styles.base";

export default Component => {
  addSerializers(
    expect,
    compose(
      stylePrinter,
      hoistStyleTransform,
      minimalWebTransform,
      rnwTransform(AppRegistry, [
        "fontSize",
        "fontFamily",
        "color",
        "lineHeight",
        "flexDirection"
      ])
    )
  );

  shared(Component);

  const renderArticleBylineMainStandard = props =>
    TestRenderer.create(
      <View>
        <Component {...props} isMainStandard />
      </View>
    );

  const tests = [
    {
      name: "main standard template - with a single author",
      test: () => {
        const testInstance = renderArticleBylineMainStandard({
          ast: authorsFixture.singleAuthor
        });

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "main standard template - with a very long byline",
      test: () => {
        const testInstance = renderArticleBylineMainStandard({
          ast: authorsFixture.veryLongByline
        });

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
