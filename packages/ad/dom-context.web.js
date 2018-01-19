import React from "react";

import makeHarness from "./dom-context-harness";
import { propTypes, defaultProps } from "./dom-context-prop-types";

/* eslint-env browser */
export default class DOMContext extends React.PureComponent {
  handleDivRef = div => {
    const { scriptUris, globalNames, init, data, id } = this.props;

    const harness = makeHarness({
      el: div,
      handleError: this.handleError,
      id,
      window,
      document,
      scriptUris,
      globalNames,
      init,
      data
    });

    this.lastError = null;
    harness.execute();
    if (this.lastError && process.env.NODE_ENV !== "production") {
      throw new Error(this.lastError);
    }
  };

  handleError = (type, detail) => {
    this.lastError = `Error in ${type} inside DomContext: ${detail}`;
  };

  render() {
    const { width, height } = this.props;
    return <div style={{ width, height }} ref={this.handleDivRef} />;
  }
}

DOMContext.propTypes = propTypes;
DOMContext.defaultProps = defaultProps;
