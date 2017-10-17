import React, { Component } from "react";
import {
  NativeModules,
  requireNativeComponent,
  TouchableWithoutFeedback,
  Text,
  View
} from "react-native";

import BrightcoveVideo from "./brightcove-player.native";

import propTypes from "./brightcove-player.proptypes";
import defaults from "./brightcove-player.defaults";

function withNativeCommand(WrappedComponent) {
  class AndroidNative extends Component {
    static uiManagerCommand(name) {
      return NativeModules.UIManager[WrappedComponent.getNativeClassName()]
        .Commands[name];
    }

    constructor(props) {
      super(props);

      this.state = {
        isFullscreen: false
      };

      this.runNativeCommand = this.runNativeCommand.bind(this);
      this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
      const publicMethods = Object.keys(this.bcv.publicMethods);

      publicMethods.forEach(name => {
        this[name] = this.bcv.publicMethods[name];
      });
    }

    onChange(evt) {
      this.setState({ isFullscreen: evt.isFullscreen });
    }

    runNativeCommand(name, args) {
      NativeModules.UIManager.dispatchViewManagerCommand(
        this.bcv.getNodeHandle(),
        AndroidNative.uiManagerCommand(name),
        args
      );
    }

    render() {
      const androidSpecificProps = {
        onChange: this.onChange
      };

      if (this.state.isFullscreen) {
        androidSpecificProps.width = "100%";
        androidSpecificProps.height = "100%";
        androidSpecificProps.position = "absolute";
        androidSpecificProps.zIndex = 9999;
      }

      const props = Object.assign(
        { runNativeCommand: this.runNativeCommand, directToFullscreen: true },
        this.props,
        androidSpecificProps
      );

      return (
        <WrappedComponent
          ref={ref => {
            this.bcv = ref;
          }}
          {...props}
        />
      );
    }
  }

  AndroidNative.defaultProps = defaults;
  AndroidNative.propTypes = propTypes;

  return AndroidNative;
}

export default withNativeCommand(BrightcoveVideo);
