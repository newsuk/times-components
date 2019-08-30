import React, { Component } from "react";
import TestRenderer from "react-test-renderer";
import PropTypes from "prop-types";
import Link from "@times-components/link";
import SaveStarWebWithTracking from "../src/save-star-with-tracking";

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
    return <SaveStarWebWithTracking {...this.props} />;
  }
}

WithTrackingContext.childContextTypes = {
  tracking: PropTypes.shape({
    analytics: PropTypes.func
  })
};

export default () => {
  describe("save star tracking events", () => {
    const stream = jest.fn();

    const testInstance = TestRenderer.create(
      <WithTrackingContext
        analyticsStream={stream}
        articleId="id-123"
        onSave={() => {}}
        savedStatus={false}
        isLoading={false}
      />
    );

    it("when press save star", async () => {
      const [saveStarLink] = testInstance.root.findAllByType(Link);
      await saveStarLink.props.onPress({ preventDefault() {} });

      const call = stream.mock.calls[0][0];
      expect(call).toMatchSnapshot();
    });
  });
};
