import React, { Component } from "react";
import PropTypes from "prop-types";
import getDisplayName from "react-display-name";
import hoistNonReactStatic from "hoist-non-react-statics";
import isEqual from "lodash.isequal";

const withDebounce = WrappedComponent => {
  const validateProps = props => {
    if (typeof props.debounceTimeMs !== "number") {
      throw new Error("debounceTimeMs prop required");
    }
  };

  class WithDebounce extends Component {
    static getDerivedStateFromProps(props, state) {
      if (props.debounceTimeMs !== 0) {
        return state;
      }

      if (!isEqual(props, state.debouncedProps)) {
        return {
          ...state,
          debouncedProps: props
        };
      }

      return state;
    }

    constructor(props) {
      super(props);
      validateProps(props);
      this.state = {
        debouncedProps: props,
        isDebouncing: false
      };
      this.debounceTimeout = null;
    }

    shouldComponentUpdate(props, state) {
      return state.isDebouncing ? !isEqual(this.props, props) : true;
    }

    componentDidUpdate(nextProps) {
      validateProps(nextProps);

      if (isEqual(this.props, nextProps)) return;

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ isDebouncing: true });

      clearTimeout(this.debounceTimeout);

      this.debounceTimeout = setTimeout(
        this.handleDebounceTimer,
        nextProps.debounceTimeMs
      );
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
