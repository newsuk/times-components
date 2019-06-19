import "../mocks.web";
import React, { Component } from "react";
import PropTypes from "prop-types";
import TestRenderer from "react-test-renderer";
import mockDate from "mockdate";
import Link from "@times-components/link";
import ArticleSkeleton from "../../src/article-skeleton";
import articleFixture from "../../fixtures/full-article";
import ArticleLink from "../../src/article-body/article-link";
import articleSkeletonProps from "../shared-article-skeleton-props";
import { getRegistrationType, getSharedStatus } from "../../src/data-helper";
import shared from "../shared-tracking";

beforeEach(() => {
  mockDate.set(1514764800000, 0);
  global.nuk = { user: { registrationType: "logged out" } };
});

afterEach(() => {
  mockDate.reset();
  global.nuk = {};
});

it("analytics when rendering a shared Article page with metered access", () => {
  const userStateMock = {
    isLoggedIn: true,
    isMetered: true,
    isShared: true,
    isMeteredExpired: false,
    registrationType: "metered access:article limit not reached"
  };

  global.nuk.user = userStateMock;
  const stream = jest.fn();

  TestRenderer.create(
    <ArticleSkeleton
      {...articleSkeletonProps}
      analyticsStream={stream}
      data={articleFixture()}
      Header={() => null}
      onAuthorPress={() => {}}
      onCommentGuidelinesPress={() => {}}
      onCommentsPress={() => {}}
      onLinkPress={() => {}}
      onRelatedArticlePress={() => {}}
      onTwitterLinkPress={() => {}}
      onVideoPress={() => {}}
    />
  );
  expect(stream.mock.calls).toMatchSnapshot();
});

it("getRegistrationType helper function", () => {
  expect(getRegistrationType()).toEqual("logged out");
});

it("getSharedStatus helper function", () => {
  expect(getSharedStatus()).toEqual("no");
});

it("should track ArticleLink clicks in analytics", () => {
  const analyticsStream = jest.fn();

  class WithTrackingContext extends Component {
    getChildContext() {
      return {
        tracking: {
          analytics: analyticsStream
        }
      };
    }

    render() {
      return <ArticleLink key="t-key" target="t-target" url="test.io" />;
    }
  }

  WithTrackingContext.childContextTypes = {
    tracking: PropTypes.shape({
      analytics: PropTypes.func
    })
  };

  const testInstance = TestRenderer.create(<WithTrackingContext />);

  const [articleLink] = testInstance.root.findAllByType(Link);
  articleLink.props.onPress();

  const [[callParams]] = analyticsStream.mock.calls;
  expect(callParams).toMatchSnapshot();
});

shared();
