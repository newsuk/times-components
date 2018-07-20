import React from "react";
import { View } from "react-native";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { iterator } from "@times-components/test-utils";
import ArticleByline from "../src/article-byline";
import authorsFixture from "../fixtures/authors.json";

export default Component => {
  const renderArticleByline = props =>
    renderer.create(
      <View>
        <Component {...props} />
      </View>
    );

  const tests = [
    {
      name: "single inline element",
      test: () => {
        const tree = renderArticleByline({
          ast: authorsFixture.singleInlineElement
        });

        expect(tree).toMatchSnapshot();
      }
    },
    {
      name: "with the author in the begining",
      test: () => {
        const tree = renderArticleByline({
          ast: authorsFixture.authorInTheBeginning
        });

        expect(tree).toMatchSnapshot();
      }
    },
    {
      name: "with the author at the end",
      test: () => {
        const tree = renderArticleByline({
          ast: authorsFixture.authorAtTheEnd
        });

        expect(tree).toMatchSnapshot();
      }
    },
    {
      name: "with multiple authors separated by text with commas",
      test: () => {
        const tree = renderArticleByline({
          ast: authorsFixture.multipleAuthorsCommaSeparated
        });

        expect(tree).toMatchSnapshot();
      }
    },
    {
      name: "with multiple authors separated by spaces",
      test: () => {
        const tree = renderArticleByline({
          ast: authorsFixture.multipleAuthorsSpaceSeparated
        });

        expect(tree).toMatchSnapshot();
      }
    },
    {
      name: "null with an empty AST",
      test: () => {
        const tree = renderer.create(<ArticleByline ast={[]} />);

        expect(tree).toMatchSnapshot();
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
