import React, { Component } from "react";
import PropTypes from "prop-types";
import TestRenderer from "react-test-renderer";
import { CommentContainer } from "../../src/styles/responsive";
import Comments from "../../src/comments";

class WithTrackingContext extends Component {
  getChildContext() {
    const { analyticsStream } = this.props;
    return {
      tracking: {
        analytics: analyticsStream
      }
    };
  }

  render() {
    return (
      <Comments
        articleId="test-article-id"
        isReadOnly={false}
        spotAccountId="test-spotAccountId"
      />
    );
  }
}

WithTrackingContext.childContextTypes = {
  tracking: PropTypes.shape({
    analytics: PropTypes.func
  })
};
WithTrackingContext.propTypes = {
  analyticsStream: PropTypes.func.isRequired
};

it("should track Comment start event ", () => {
  const analyticsStream = jest.fn();

  const testInstance = TestRenderer.create(
    <WithTrackingContext analyticsStream={analyticsStream} />
  );
  const [commentsContainer] = testInstance.root.findAllByType(CommentContainer);

  commentsContainer.props.onCommentStart();

  const [[callParams]] = analyticsStream.mock.calls;
  expect(callParams).toMatchSnapshot();
});

it("should track Comment post (complete) event ", () => {
  const analyticsStream = jest.fn();

  const testInstance = TestRenderer.create(
    <WithTrackingContext analyticsStream={analyticsStream} />
  );
  const [commentsContainer] = testInstance.root.findAllByType(CommentContainer);

  commentsContainer.props.onCommentPost();

  const [[callParams]] = analyticsStream.mock.calls;
  expect(callParams).toMatchSnapshot();
});

it("should track Comment notification event", () => {
  const analyticsStream = jest.fn();

  const testInstance = TestRenderer.create(
    <WithTrackingContext analyticsStream={analyticsStream} />
  );
  const [commentsContainer] = testInstance.root.findAllByType(CommentContainer);

  commentsContainer.props.onCommentNotification();

  const [[callParams]] = analyticsStream.mock.calls;
  expect(callParams).toMatchSnapshot();
});

it("should track Comments filtered by newest event", () => {
  const analyticsStream = jest.fn();

  const testInstance = TestRenderer.create(
    <WithTrackingContext analyticsStream={analyticsStream} />
  );
  const [commentsContainer] = testInstance.root.findAllByType(CommentContainer);

  commentsContainer.props.onCommentFilterNewest();

  const [[callParams]] = analyticsStream.mock.calls;
  expect(callParams).toMatchSnapshot();
});

it("should track Comments filtered by most recommended", () => {
  const analyticsStream = jest.fn();

  const testInstance = TestRenderer.create(
    <WithTrackingContext analyticsStream={analyticsStream} />
  );
  const [commentsContainer] = testInstance.root.findAllByType(CommentContainer);

  commentsContainer.props.onCommentFilterMostRecommended();

  const [[callParams]] = analyticsStream.mock.calls;
  expect(callParams).toMatchSnapshot();
});

it("should track Comments filtered by oldest", () => {
  const analyticsStream = jest.fn();

  const testInstance = TestRenderer.create(
    <WithTrackingContext analyticsStream={analyticsStream} />
  );
  const [commentsContainer] = testInstance.root.findAllByType(CommentContainer);

  commentsContainer.props.onCommentFilterOldest();

  const [[callParams]] = analyticsStream.mock.calls;
  expect(callParams).toMatchSnapshot();
});

it("should track Comment reply click event", () => {
  const analyticsStream = jest.fn();

  const testInstance = TestRenderer.create(
    <WithTrackingContext analyticsStream={analyticsStream} />
  );
  const [commentsContainer] = testInstance.root.findAllByType(CommentContainer);

  commentsContainer.props.onCommentReplyClick();

  const [[callParams]] = analyticsStream.mock.calls;
  expect(callParams).toMatchSnapshot();
});

it("should track Comment settings button click event", () => {
  const analyticsStream = jest.fn();

  const testInstance = TestRenderer.create(
    <WithTrackingContext analyticsStream={analyticsStream} />
  );
  const [commentsContainer] = testInstance.root.findAllByType(CommentContainer);

  commentsContainer.props.onCommentSettingsClicked();

  const [[callParams]] = analyticsStream.mock.calls;
  expect(callParams).toMatchSnapshot();
});

it("should track Comment shared by link event", () => {
  const analyticsStream = jest.fn();

  const testInstance = TestRenderer.create(
    <WithTrackingContext analyticsStream={analyticsStream} />
  );
  const [commentsContainer] = testInstance.root.findAllByType(CommentContainer);

  commentsContainer.props.onCommentShareLink();

  const [[callParams]] = analyticsStream.mock.calls;
  expect(callParams).toMatchSnapshot();
});

it("should track Comment shared by email event", () => {
  const analyticsStream = jest.fn();

  const testInstance = TestRenderer.create(
    <WithTrackingContext analyticsStream={analyticsStream} />
  );
  const [commentsContainer] = testInstance.root.findAllByType(CommentContainer);

  commentsContainer.props.onCommentShareEmail();

  const [[callParams]] = analyticsStream.mock.calls;
  expect(callParams).toMatchSnapshot();
});

it("should track Comment shared by twitter event", () => {
  const analyticsStream = jest.fn();

  const testInstance = TestRenderer.create(
    <WithTrackingContext analyticsStream={analyticsStream} />
  );
  const [commentsContainer] = testInstance.root.findAllByType(CommentContainer);

  commentsContainer.props.onCommentShareTwitter();

  const [[callParams]] = analyticsStream.mock.calls;
  expect(callParams).toMatchSnapshot();
});

it("should track Comment shared by facebook event", () => {
  const analyticsStream = jest.fn();

  const testInstance = TestRenderer.create(
    <WithTrackingContext analyticsStream={analyticsStream} />
  );
  const [commentsContainer] = testInstance.root.findAllByType(CommentContainer);

  commentsContainer.props.onCommentShareFacebook();

  const [[callParams]] = analyticsStream.mock.calls;
  expect(callParams).toMatchSnapshot();
});

it("should track Comment when it is recommended", () => {
  const analyticsStream = jest.fn();

  const testInstance = TestRenderer.create(
    <WithTrackingContext analyticsStream={analyticsStream} />
  );
  const [commentsContainer] = testInstance.root.findAllByType(CommentContainer);

  commentsContainer.props.onCommentRecommend();

  const [[callParams]] = analyticsStream.mock.calls;
  expect(callParams).toMatchSnapshot();
});

it("should track when user clicks on a comment notification", () => {
  const analyticsStream = jest.fn();

  const testInstance = TestRenderer.create(
    <WithTrackingContext analyticsStream={analyticsStream} />
  );
  const [commentsContainer] = testInstance.root.findAllByType(CommentContainer);

  commentsContainer.props.onCommentNotificationClicked();

  const [[callParams]] = analyticsStream.mock.calls;
  expect(callParams).toMatchSnapshot();
});

it("should track when user clicks on their username", () => {
  const analyticsStream = jest.fn();

  const testInstance = TestRenderer.create(
    <WithTrackingContext analyticsStream={analyticsStream} />
  );
  const [commentsContainer] = testInstance.root.findAllByType(CommentContainer);

  commentsContainer.props.onCommentUsernameClicked();

  const [[callParams]] = analyticsStream.mock.calls;
  expect(callParams).toMatchSnapshot();
});
