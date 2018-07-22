import React, { Component } from "react";
import PropTypes from "prop-types";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import Link from "@times-components/link";
import ArticleList from "../src/article-list";
import articlesFixture from "../fixtures/articles.json";

export default () => {
  jest.useFakeTimers();

  const tests = [
    {
      name: "article list tracking",
      test() {
        const stream = jest.fn();

        class WithTrackingContext extends Component {
          getChildContext() {
            return {
              tracking: {
                analytics: stream
              }
            };
          }

          render() {
            return (
              <ArticleList
                articles={articlesFixture}
                emptyStateMessage="Empty state"
                onArticlePress={() => {}}
                pageSize={3}
                refetch={() => {}}
              />
            );
          }
        }

        WithTrackingContext.childContextTypes = {
          tracking: PropTypes.shape({
            analytics: PropTypes.func
          })
        };

        const testInstance = TestRenderer.create(<WithTrackingContext />);

        const [link] = testInstance.root.findAllByType(Link);

        link.props.onPress();

        const [[call]] = stream.mock.calls;

        expect(call).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
