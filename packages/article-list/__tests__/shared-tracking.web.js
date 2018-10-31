import React, { Component } from "react";
import PropTypes from "prop-types";
import TestRenderer from "react-test-renderer";
import Context from "@times-components/context";
import { iterator } from "@times-components/test-utils";
import ArticleList from "../src/article-list";
import articlesFixture from "../fixtures/articles.json";
import adConfig from "../fixtures/article-ad-config.json";

const makeArticleUrl = ({ slug, shortIdentifier }) =>
  slug && shortIdentifier
    ? `https://www.thetimes.co.uk/article/${slug}-${shortIdentifier}`
    : "";

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
              <Context.Provider value={{ makeArticleUrl }}>
                <ArticleList
                  adConfig={adConfig}
                  articles={articlesFixture}
                  emptyStateMessage="Empty state"
                  pageSize={3}
                  refetch={() => {}}
                />
              </Context.Provider>
            );
          }
        }

        WithTrackingContext.childContextTypes = {
          tracking: PropTypes.shape({
            analytics: PropTypes.func
          })
        };

        const testInstance = TestRenderer.create(<WithTrackingContext />);

        const [trackedItem] = testInstance.root.findAll(
          node => node.type.displayName === "ArticleListItem"
        );

        trackedItem.props.onPress();

        const [[call]] = stream.mock.calls;

        expect(call).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
