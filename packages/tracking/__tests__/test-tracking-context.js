import React, { Component } from "react";
import trackingContextTypes from "../tracking-context-types";

export default WrappedComponent => {
  class TestContext extends Component {
    static get childContextTypes() {
      return trackingContextTypes;
    }
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

  return TestContext;
};
