/* eslint-disable prefer-destructuring */
import React, { Component } from "react";
import PropTypes from "prop-types";
import TestRenderer from "react-test-renderer";
import Link from "@times-components/link";
import RelatedArticleItem from "../src/related-article-item";
import * as util from "./shared-util.base";

export const testSummary = util.testSummary;

export const createRelatedArticlesProps = util.createRelatedArticlesProps;

export const noArticlesTests = util.noArticlesTests;

export const hasVideoTests = util.hasVideoTests;

export const noShortHeadlineTests = util.noShortHeadlineTests;

export const oneArticleTests = util.oneArticleTests(fixture => [
  {
    name: "on press analytics triggered",
    test() {
      const stream = jest.fn();

      const {
        items = [],
        lead = {},
        opinion = {}
      } = fixture.relatedArticleSlice;

      if (items.length === 0 && !lead && !opinion) return;

      const article = lead.article || opinion.article || items[0].article;

      class WithTrackingContext extends Component {
        getChildContext() {
          return {
            tracking: {
              analytics: stream
            }
          };
        }

        render() {
          return <RelatedArticleItem article={article} onPress={() => {}} />;
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
]);

export const twoArticlesTests = util.twoArticlesTests;

export const threeArticlesTests = util.threeArticlesTests;

export const threeArticlesWithLeadAssetOverrideTests =
  util.threeArticlesWithLeadAssetOverrideTests;
