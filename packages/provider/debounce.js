import React, { Component } from "react";
import PropTypes from "prop-types";
import getDisplayName from "react-display-name";
import hoistNonReactStatic from "hoist-non-react-statics";

const withDebounce = WrappedComponent => {
  const validateProps = props => {
    if (typeof props.debounceTimeMs !== "number") {
      throw new Error("debounceTimeMs prop required");
    }
  };

  class WithDebounce extends Component {
    constructor(props) {
      super(props);
      validateProps(props);
      this.state = {
        debouncedProps: props,
        isDebouncing: false
      };
      this.debounceTimeout = null;
    }

    componentWillReceiveProps(nextProps) {
      validateProps(nextProps);
      if (this.props.debounceTimeMs === 0) {
        this.setState({ debouncedProps: nextProps, isDebouncing: false });
      } else {
        this.setState({ isDebouncing: true });
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(
          this.handleDebounceTimer,
          nextProps.debounceTimeMs
        );
      }
    }

    componentWillUnmount() {
      clearTimeout(this.debounceTimeout);
    }

    handleDebounceTimer = () => {
      this.debounceTimeout = null;
      this.setState({ debouncedProps: this.props, isDebouncing: false });
    };

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  }

  WithDebounce.displayName = `WithDebounce(${getDisplayName(
    WrappedComponent
  )})`;
  WithDebounce.propTypes = {
    debounceTimeMs: PropTypes.number.isRequired,
    ...WrappedComponent.propTypes
  };
  delete WithDebounce.propTypes.debouncedProps;
  delete WithDebounce.propTypes.isDebouncing;
  WithDebounce.defaultProps = WrappedComponent.defaultProps;
  hoistNonReactStatic(WithDebounce, WrappedComponent);

  return WithDebounce;
};

export default withDebounce;
