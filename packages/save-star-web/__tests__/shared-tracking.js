import React, { Component } from "react";
import TestRenderer from "react-test-renderer";
import PropTypes from "prop-types";
import Link from "@times-components/link";
import mockSaveApi from "../mock-save-api";
import SaveStarWeb from "../src/save-star-web";

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
    return <SaveStarWeb {...this.props} />;
  }
}

WithTrackingContext.childContextTypes = {
  tracking: PropTypes.shape({
    analytics: PropTypes.func
  })
};

WithTrackingContext.propTypes = {
  analyticsStream: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired,
  saveApi: PropTypes.shape({
    bookmark: PropTypes.func.isRequired,
    getBookmarks: PropTypes.func.isRequired,
    unBookmark: PropTypes.func.isRequired
  }).isRequired,
  onSaveButtonPress: PropTypes.func.isRequired
};

export default () => {
  describe("save star tracking events", () => {
    const articleId = "id-123";
    const articleHeadline = "Article-headline";
    const stream = jest.fn();
    const onSaveButtonPress = jest.fn();

    const testInstance = TestRenderer.create(
      <WithTrackingContext
        analyticsStream={stream}
        articleId={articleId}
        articleHeadline={articleHeadline}
        saveApi={mockSaveApi}
        onSaveButtonPress={onSaveButtonPress}
      />
    );

    it("when press save star", async () => {
      const [saveStarLink] = testInstance.root.findAllByType(Link);
      await saveStarLink.props.onPress();

      const [[call]] = stream.mock.calls;
      expect(call).toMatchSnapshot();
    });
  });
};
