import React from "react";
import { View } from "react-native";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import authorsFixture from "../fixtures/authors.json";

export default Component => {
  const renderArticleByline = props =>
    TestRenderer.create(
      <View>
        <Component {...props} />
      </View>
    );

  const tests = [
    {
      name: "with a single author",
      test: () => {
        const testInstance = renderArticleByline({
          ast: authorsFixture.singleAuthor
        });

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "with a very long byline",
      test: () => {
        const testInstance = renderArticleByline({
          ast: authorsFixture.veryLongByline
        });

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
