import React, { Component } from "react";
import trackingContextTypes from "../tracking-context-types";

export default WrappedComponent => {
  class TestContext extends Component {
    getChildContext() {
      const self = this;
      return {
        tracking: {
          analytics(...args) {
            self.props.analyticsStream(...args);
          }
        }
      };
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  TestContext.childContextTypes = trackingContextTypes;

  return TestContext;
};
