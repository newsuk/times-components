import React, { Component } from "react";
import { View, Text } from "react-native";
import { fonts, fontSizes } from "@times-components/styleguide";

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
  },
  subTitle: {
    fontFamily: fonts.body,
    fontSize: fontSizes.heading4Mobile
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

    renderErrorMessage = () => (
      <View style={styles.container}>
        <Text style={styles.title}>Something went wrong</Text>
        <Text style={styles.subTitle}>Please try again</Text>
      </View>
    );

    render() {
      const { hasError } = this.state;
      return hasError ? (
        this.renderErrorMessage()
      ) : (
        <WrappedComponent {...this.props} />
      );
    }
  };

export default withErrorBoundaries;
