/* eslint-disable react/prefer-stateless-function, react/require-render-return, react/no-multi-comp */
import React, { Component } from "react";
import { TcText, TcView } from "@times-components/utils";
import PropTypes from "prop-types";
import { fontSizes } from "@times-components/ts-styleguide";
import ErrorView from "./src/error-view";

const { style: ViewPropTypesStyle } = PropTypes.object;

class BadComponent extends Component {
  render() {
    throw new Error("oh no");
  }
}

const styles = {
  background: {
    backgroundColor: "red"
  },
  customError: {
    alignItems: "center",
    height: "300px",
    justifyContent: "center",
    width: "400px"
  },
  text: {
    color: "white",
    fontSize: fontSizes.smallestHeadline
  }
};

const ErrorState = ({ error: { message }, style }) => (
  <TcView style={{ ...styles.background, ...style }}>
    <TcText style={styles.text}>Err Message: {message}</TcText>
  </TcView>
);

ErrorState.defaultProps = {
  error: null,
  style: {}
};

ErrorState.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
    stack: PropTypes.string
  }),
  style: ViewPropTypesStyle
};

class FiresOnError extends Component {
  componentDidMount() {
    const { onError } = this.props;
    setTimeout(() => onError(new Error("async error")), 500);
  }

  render() {
    return <TcText>Fires errors</TcText>;
  }
}

FiresOnError.propTypes = {
  onError: PropTypes.func.isRequired
};

export default {
  children: [
    {
      component: () => (
        <ErrorView>
          {({ hasError, error }) =>
            hasError ? (
              <ErrorState error={error} style={styles.customError} />
            ) : (
              <BadComponent />
            )
          }
        </ErrorView>
      ),
      name: "Error",
      type: "story"
    },
    {
      component: () => (
        <ErrorView>
          {({ hasError, onError, error }) =>
            hasError ? (
              <ErrorState error={error} style={styles.customError} />
            ) : (
              <FiresOnError onError={onError} />
            )
          }
        </ErrorView>
      ),
      name: "Async error",
      type: "story"
    }
  ],
  name: "Primitives/Error View"
};
