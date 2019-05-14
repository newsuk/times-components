import React, { Component } from "react";
import PropTypes from "prop-types";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import ArticleList from "../src/article-list";
import articlesFixture from "../fixtures/articles.json";
import adConfig from "../fixtures/article-ad-config.json";
import ArticleListItem from "../src/article-list-item";

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
                adConfig={adConfig}
                articles={articlesFixture}
                emptyStateMessage="Empty state"
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

        const [trackedItem] = testInstance.root.findAllByType(ArticleListItem);

        trackedItem.children[0].props.onPress();
        const [[call]] = stream.mock.calls;

        expect(call).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
