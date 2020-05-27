import React from "react";
import { NativeModules, View, Text } from "react-native";
import { fonts, fontSizes } from "@times-components/styleguide";

const { componentCaughtError } = NativeModules.ReactAnalytics;

const styles= {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
}

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    componentCaughtError(error.message, errorInfo.componentStack);
  }

  renderErrorMessage() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Something went wrong</Text>
        <Text style={styles.subTitle}>Please try again</Text>
      </View>
    );
  }

  render() {
    return this.state.hasError ? this.renderErrorMessage() : this.props.children;
  }
}
