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
