import React, { Component } from "react";
import { View, Text, NativeModules, Platform } from "react-native";
import { fonts, fontSizes } from "@times-components/styleguide";

const { componentCaughtError } = NativeModules.ReactAnalytics;

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontFamily: fonts.headline,
    fontSize: fontSizes.heading2Mobile,
    marginBottom: 20
  }
};

const withErrorBoundaries = WrappedComponent =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      componentCaughtError(error.message, errorInfo.componentStack);
    }

    renderErrorMessage = () => (
      <View style={styles.container}>
        <Text style={styles.title}>Something went wrong</Text>
      </View>
    );

    render() {
      const { hasError } = this.state;
      const isNative = Platform.OS === "ios" || Platform.OS === "android";

      return isNative && hasError ? (
        this.renderErrorMessage()
      ) : (
        <WrappedComponent {...this.props} />
      );
    }
  };

export default withErrorBoundaries;
