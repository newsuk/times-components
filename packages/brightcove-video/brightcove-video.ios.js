import React, { Component } from "react";
import { NativeModules } from "react-native";

import BrightcoveVideo from "./brightcove-video.native";

import propTypes from "./brightcove-video.proptypes";
import defaults from "./brightcove-video.defaults";

function withNativeCommand(WrappedComponent) {
  class IOSNative extends Component {
    static managerCommand(name) {
      return NativeModules[`${WrappedComponent.getNativeClassName()}Manager`][
        name
      ];
    }

    constructor(props) {
      super(props);

      this.runNativeCommand = this.runNativeCommand.bind(this);
    }

    componentDidMount() {
      const publicMethods = Object.keys(this.bcv.publicMethods);

      publicMethods.forEach(name => {
        this[name] = this.bcv.publicMethods[name];
      });
    }

    runNativeCommand(name, args) {
      IOSNative.managerCommand(name)(this.bcv.getNodeHandle(), ...args);
    }

    render() {
      return (
        <WrappedComponent
          ref={ref => {
            this.bcv = ref;
          }}
          runNativeCommand={this.runNativeCommand}
          {...this.props}
        />
      );
    }
  }

  IOSNative.defaultProps = defaults;
  IOSNative.propTypes = propTypes;

  return IOSNative;
}

export default withNativeCommand(BrightcoveVideo);
