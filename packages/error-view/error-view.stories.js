/* eslint-disable react/prefer-stateless-function, react/require-render-return, react/no-multi-comp */

import React, { Component } from "react";
import { View, ViewPropTypes, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { storiesOf } from "@storybook/react-native";
import Video from "@times-components/video";
import { fontSizes } from "@times-components/styleguide";
import ErrorView from "./src/error-view";

const { style: ViewPropTypesStyle } = ViewPropTypes;

class BadComponent extends Component {
  render() {
    throw new Error("oh no");
  }
}

const styles = StyleSheet.create({
  text: { color: "white", fontSize: fontSizes.smallestHeadline },
  background: {
    backgroundColor: "red"
  },
  customError: {
    width: 400,
    height: 300,
    alignItems: "center",
    justifyContent: "center"
  }
});

const ErrorState = ({ error: { message }, style }) => (
  <View style={[styles.background, style]}>
    <Text style={styles.text}>Err Message: {message}</Text>
  </View>
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
    setTimeout(() => this.props.onError(new Error("async error")), 500);
  }

  render() {
    return <Text>Fires errors</Text>;
  }
}

FiresOnError.propTypes = {
  onError: PropTypes.func.isRequired
};

storiesOf("Primitives/ErrorView", module)
  .add("handles a component that errors", () => (
    <ErrorView>
      {({ hasError, error }) =>
        hasError ? (
          <ErrorState error={error} style={styles.customError} />
        ) : (
          <BadComponent />
        )
      }
    </ErrorView>
  ))
  .add("handles a component that fires onError", () => (
    <ErrorView>
      {({ hasError, onError, error }) =>
        hasError ? (
          <ErrorState error={error} style={styles.customError} />
        ) : (
          <FiresOnError onError={onError} />
        )
      }
    </ErrorView>
  ))
  .add("handling a broken video", () => (
    <ErrorView>
      {({ hasError, onError, error }) =>
        hasError ? (
          <ErrorState error={error} style={{ width: 400, height: 300 }} />
        ) : (
          <Video
            style={{ width: 400, height: 300 }}
            width={400}
            height={300}
            policyKey="x"
            videoId="y"
            accountId="z"
            onError={onError}
          />
        )
      }
    </ErrorView>
  ));
