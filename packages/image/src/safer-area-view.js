import React, { Component } from "react";
import { SafeAreaView } from "react-native";

/*
 * React Native helpfully includes a SafeAreaView component to help you to avoid
 * rendering components underneath system elements like status bars and
 * "notches".
 *
 * Unhelpfully, this seems to force extra "layout" events on child components
 * which then initially render incorrectly if they depend on the dimensions of
 * their parent components.
 *
 * This component ignores those initial onLayout events and does not render
 * its children until SafeAreaView has finished calculating.
 */
class SaferAreaView extends Component {
  constructor(props) {
    super(props);
    this.state = { hasFinishedSafeViewCalculation: false, layoutCount: 0 };
    this.onLayout = this.onLayout.bind(this);
  }

  onLayout() {
    let { layoutCount } = this.state;

    layoutCount += 1;
    this.setState({
      hasFinishedSafeViewCalculation: layoutCount > 1,
      layoutCount
    });
  }

  render() {
    const { children, onLayout, ...props } = this.props;
    const { hasFinishedSafeViewCalculation } = this.state;

    return (
      <SafeAreaView
        {...props}
        onLayout={hasFinishedSafeViewCalculation ? onLayout : this.onLayout}
      >
        {hasFinishedSafeViewCalculation ? children : null}
      </SafeAreaView>
    );
  }
}

SaferAreaView.propTypes = SafeAreaView.propTypes;

export default SaferAreaView;
