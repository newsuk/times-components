import React, { Component } from "react";
import { NativeModules } from "react-native";
import PropTypes from "prop-types";

import BrightcoveVideo from "./brightcove-player-helper";

import propTypes from "./brightcove-player.proptypes";
import defaults from "./brightcove-player.defaults";

function withNativeCommand(WrappedComponent) {
  class AndroidNative extends Component {
    static uiManagerCommand(name) {
      return NativeModules.UIManager[WrappedComponent.getNativeClassName()]
        .Commands[name];
    }

    static filterKeys(objToFilter, allowedKeys) {
      return Object.keys(objToFilter) // filter out android only props
        .filter(key => allowedKeys.includes(key))
        .reduce((obj, key) => {
          const newObj = Object.assign({}, obj);
          newObj[key] = objToFilter[key];
          return newObj;
        }, {});
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
        AndroidNative.filterKeys(this.props, Object.keys(propTypes)),
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

  AndroidNative.defaultProps = Object.assign(
    {
      onEnterFullscreen: () => {},
      onExitFullscreen: () => {}
    },
    defaults
  );
  AndroidNative.propTypes = {
    onEnterFullscreen: PropTypes.func,
    onExitFullscreen: PropTypes.func,
    ...propTypes
  };

  return AndroidNative;
}

export default withNativeCommand(BrightcoveVideo);
