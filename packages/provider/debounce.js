import React from "react";
import getDisplayName from "react-display-name";
import hoistNonReactStatic from "hoist-non-react-statics";

const withDebounce = (WrappedComponent, debounceTimeMs) => {
  class WithDebounce extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        debouncedProps: props,
        isDebouncing: false
      };
      this.debounceTimeout = null;
    }

    componentWillReceiveProps() {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(
        this.handleDebounceTimer,
        debounceTimeMs
      );
      this.setState({ isDebouncing: true });
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
  WithDebounce.propTypes = WrappedComponent.propTypes;
  WithDebounce.defaultProps = WrappedComponent.defaultProps;
  hoistNonReactStatic(WithDebounce, WrappedComponent);

  return WithDebounce;
};

export default withDebounce;
