import React from "react";

import makeHarness from "./dom-context-harness";
import { propTypes, defaultProps } from "./dom-context-prop-types";

/* eslint-env browser */
export default class DOMContext extends React.PureComponent {
  componentDidMount() {
    const { scriptUris, globalNames, init, data, id } = this.props;

    const harness = makeHarness({
      el: this.div,
      eventCallback: this.eventCallback,
      id,
      window,
      document,
      scriptUris,
      globalNames,
      init,
      data
    });

    this.harnessExecuting = true;
    harness.execute();
    this.harnessExecuting = false;
    this.processEventQueue();
  }

  eventQueue = [];

  eventCallback = (type, detail) => {
    this.eventQueue.push({ type, detail });
    this.processEventQueue();
  };

  processEventQueue() {
    if (!this.harnessExecuting) {
      this.eventQueue.forEach(this.processEvent);
      this.eventQueue = [];
    }
  }

  processEvent = ({ type, detail }) => {
    if (type === "error") {
      throw new Error(`DomContext error: ${detail}`);
    }
    if (type === "renderComplete") {
      this.props.onRenderComplete();
    }
  };

  render() {
    const { width, height } = this.props;
    return (
      <div
        style={{ width, height, overflow: "hidden" }}
        ref={div => {
          this.div = div;
        }}
      />
    );
  }
}

DOMContext.propTypes = propTypes;
DOMContext.defaultProps = defaultProps;
