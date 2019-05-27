import React, { Component } from "react";
import TestRenderer from "react-test-renderer";
import mockSaveApi from "@times-components/save-star-web/mock-save-api";
import PropTypes from "prop-types";
import SaveStarWeb from "../src/save-star-web";
import Link from "@times-components/link";

class WithTrackingContext extends Component {
  getChildContext() {
    const { analyticStream } = this.props;
    return {
      tracking: {
        analytics: analyticStream
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
  analyticStream: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired,
  saveApi: PropTypes.object,
  onSaveButtonPress: PropTypes.func.isRequired
};

export default () => {
  describe("save star tracking events", () => {
    let testInstance = null
    let stream = null
    const onSaveButtonPress = jest.fn();

    beforeEach(() => {
      const articleId = "id-123";
      stream = jest.fn();
      testInstance = TestRenderer.create(
          <WithTrackingContext
            analyticStream={stream}
            articleId={articleId}
            saveApi={mockSaveApi}
            onSaveButtonPress={onSaveButtonPress}
          />
        );
    })

    it("when press save star", () => {
      const saveStarLink = testInstance.root.findAllByType(
        Link
      )[0];
      saveStarLink.props.onPress();
      const [[call]] = stream.mock.calls;

      expect(call).toMatchSnapshot();
      expect(onSaveButtonPress.mock.calls).toMatchSnapshot();
    });
  });
};
