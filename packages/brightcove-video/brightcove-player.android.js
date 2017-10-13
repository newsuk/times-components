import React, { Component } from "react";
import { NativeModules } from "react-native";
import PropTypes from "prop-types";

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
      if (evt.isFullscreen !== this.state.isFullscreen) {
        this.setState({ isFullscreen: evt.isFullscreen });

        if (evt.isFullscreen) {
          this.props.onEnterFullscreen();
        } else {
          this.props.onExitFullscreen();
        }
      }
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
        { runNativeCommand: this.runNativeCommand },
        Object.keys(this.props) // filter out android only props
          .filter(key => Object.keys(propTypes).includes(key))
          .reduce((obj, key) => {
            obj[key] = this.props[key];
            return obj;
          }, {}),
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

  AndroidNative.defaultProps = Object.assign(defaults, {
    onEnterFullscreen: () => {},
    onExitFullscreen: () => {}
  });
  AndroidNative.propTypes = Object.assign(propTypes, {
    onEnterFullscreen: PropTypes.func,
    onExitFullscreen: PropTypes.func
  });

  return AndroidNative;
}

export default withNativeCommand(BrightcoveVideo);
