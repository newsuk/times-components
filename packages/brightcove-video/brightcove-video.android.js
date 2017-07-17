import React, { Component } from "react";
import { NativeModules } from "react-native";

import BrightcoveVideo from "./brightcove-video.native";

function withNativeCommand(WrappedComponent) {
  class AndroidNative extends Component {
    static uiManagerCommand(name) {
      return NativeModules.UIManager[WrappedComponent.getNativeClassName()]
        .Commands[name];
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
      NativeModules.UIManager.dispatchViewManagerCommand(
        this.bcv.getNodeHandle(),
        AndroidNative.uiManagerCommand(name),
        args
      );
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

  return AndroidNative;
}

export default withNativeCommand(BrightcoveVideo);
