/* eslint-env browser */
import React, { Component } from "react";
import { propTypes, defaultProps } from "./dom-context-prop-types";
import logger from "./utils/logger";

class DOMContext extends Component {
  eventQueue = [];

  componentDidMount() {
    const { data, init } = this.props;

    this.initExecuting = true;
    this.hasUnmounted = false;

    this.adInit = init({
      data,
      el: this.div,
      eventCallback: this.eventCallback,
      platform: "web",
      window
    });

    if (this.adInit && this.adInit.init) {
      this.adInit.init();
    }

    this.initExecuting = false;
    this.processEventQueue();
  }

  componentWillUnmount() {
    this.eventQueue = [];
    this.hasUnmounted = true;
    this.adInit.destroySlots();
  }

  eventCallback = (type, detail) => {
    this.eventQueue.push({
      detail,
      type
    });
    this.processEventQueue();
  };

  processEvent = ({ type, detail }) => {
    const { onRenderComplete, onRenderError, data } = this.props;
    if (this.eventQueue.length === 0) return;
    switch (type) {
      case "renderFailed":
        onRenderError();
        break;
      case "renderComplete":
        onRenderComplete();
        break;
      default:
        if (data.debug) {
          logger(type, detail);
        }
    }
  };

  processEventQueue() {
    if (!this.initExecuting && !this.hasUnmounted) {
      this.eventQueue.forEach(this.processEvent);
      this.eventQueue = [];
    }
  }

  render() {
    const { width } = this.props;
    return (
      <div
        ref={div => {
          this.div = div;
        }}
        style={{ height: "auto", overflow: "hidden", width }}
      />
    );
  }
}

DOMContext.propTypes = propTypes;
DOMContext.defaultProps = defaultProps;

export default DOMContext;
