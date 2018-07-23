import React from "react";
import { View } from "react-native";
import TestRenderer from "react-test-renderer";
import { shallow } from "enzyme";
import { iterator } from "@times-components/test-utils";
import ArticleByline from "../src/article-byline";
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
      name: "single inline element",
      test: () => {
        const testInstance = renderArticleByline({
          ast: authorsFixture.singleInlineElement
        });

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "with the author in the begining",
      test: () => {
        const testInstance = renderArticleByline({
          ast: authorsFixture.authorInTheBeginning
        });

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "with the author at the end",
      test: () => {
        const testInstance = renderArticleByline({
          ast: authorsFixture.authorAtTheEnd
        });

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "with multiple authors separated by text with commas",
      test: () => {
        const testInstance = renderArticleByline({
          ast: authorsFixture.multipleAuthorsCommaSeparated
        });

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "with multiple authors separated by spaces",
      test: () => {
        const testInstance = renderArticleByline({
          ast: authorsFixture.multipleAuthorsSpaceSeparated
        });

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "null with an empty AST",
      test: () => {
        const testInstance = TestRenderer.create(<ArticleByline ast={[]} />);

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  if (Component.displayName === "ArticleBylineWithLinks") {
    tests.push(
      {
        name: "handle the onPress event",
        test: () => {
          const onAuthorPressMock = jest.fn();
          const wrapper = shallow(
            <Component
              ast={authorsFixture.singleAuthor}
              onAuthorPress={onAuthorPressMock}
            />
          );

          wrapper
            .at(0)
            .dive()
            .find("Text")
            .simulate("press");

          expect(onAuthorPressMock).toHaveBeenCalled();
        }
      },
      {
        name: "handle an empty onPress event",
        test: () => {
          const wrapper = shallow(
            <Component ast={authorsFixture.singleAuthor} />
          );

          expect(() =>
            wrapper
              .at(0)
              .dive()
              .find("Text")
              .simulate("press")
          ).not.toThrow();
        }
      }
    );
  }

  iterator(tests);
};
