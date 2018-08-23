import React from "react";
import { View } from "react-native";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import authorsFixture from "../fixtures/authors.json";

const styles = {
  link: {
    color: "red",
    textDecorationLine: "underline"
  }
};

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
      name: "with a given section colour",
      test: () => {
        const testInstance = renderArticleByline({
          ast: authorsFixture.singleAuthor,
          color: "blue"
        });

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "with given styles",
      test: () => {
        const testInstance = renderArticleByline({
          ast: authorsFixture.singleAuthor,
          style: styles
        });

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "with a a very long byline",
      test: () => {
        const testInstance = renderArticleByline({
          ast: authorsFixture.veryLongByline,
          color: "blue"
        });

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
