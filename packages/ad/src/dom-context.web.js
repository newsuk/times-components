import React from "react";

import { propTypes, defaultProps } from "./dom-context-prop-types";

/* eslint-env browser */
export default class DOMContext extends React.PureComponent {
  componentDidMount() {
    const { init, data } = this.props;

    this.initExecuting = true;

    const adInit = init({
      el: this.div,
      eventCallback: this.eventCallback,
      platform: "web",
      data,
      window
    });

    if (adInit && adInit.init) {
      adInit.init();
    }

    this.initExecuting = false;
    this.processEventQueue();
  }

  eventQueue = [];

  eventCallback = (type, detail) => {
    this.eventQueue.push({ type, detail });
    this.processEventQueue();
  };

  processEventQueue() {
    if (!this.initExecuting) {
      this.eventQueue.forEach(this.processEvent);
      this.eventQueue = [];
    }
  }

  processEvent = ({ type, detail }) => {
    if (type === "error") {
      throw new Error(`DomContext error: ${detail}`);
    } else if (type === "renderComplete") {
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
