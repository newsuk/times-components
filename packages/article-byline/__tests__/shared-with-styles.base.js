import React from "react";
import { View } from "react-native";
import renderer from "react-test-renderer";
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
    renderer.create(
      <View>
        <Component {...props} />
      </View>
    );

  const tests = [
    {
      name: "with a single author",
      test: () => {
        const tree = renderArticleByline({
          ast: authorsFixture.singleAuthor
        });

        expect(tree).toMatchSnapshot();
      }
    },
    {
      name: "with a given section colour",
      test: () => {
        const tree = renderArticleByline({
          ast: authorsFixture.singleAuthor,
          color: "blue"
        });

        expect(tree).toMatchSnapshot();
      }
    },
    {
      name: "with given styles",
      test: () => {
        const tree = renderArticleByline({
          ast: authorsFixture.singleAuthor,
          style: styles
        });

        expect(tree).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
