import React from "react";

import makeHarness from "./dom-context-harness";
import { propTypes, defaultProps } from "./dom-context-prop-types";

/* eslint-env browser */
export default class DOMContext extends React.PureComponent {
  componentDidMount() {
    const { scripts, init, data, id, platform } = this.props;
    const harness = makeHarness({
      el: this.div,
      eventCallback: this.eventCallback,
      id,
      window,
      document,
      scripts,
      init,
      data,
      platform
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
    } else if (type === "renderComplete") {
      this.props.onRenderComplete();
    } else if (type === "log") {
      console.log(detail); // eslint-disable-line no-console
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
