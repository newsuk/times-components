import React from "react";
import { StyleSheet, View, ViewPropTypes } from "react-native";
import Gradient from "@times-components/gradient";
import T from "./t";

const { style: ViewPropTypesStyle } = ViewPropTypes;

const SCALING_FACTOR = 0.27411167512690354;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  t: {
    justifyContent: "center",
    alignItems: "center"
  }
});

class Placeholder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleLayout = this.handleLayout.bind(this);
  }

  handleLayout({ nativeEvent: { layout: { width } } }) {
    this.setState({
      width
    });
  }

  render() {
    const { style } = this.props;
    const { width } = this.state;

    const tComponent = width ? (
      <View style={[styles.container, styles.t]}>
        <T width={width * SCALING_FACTOR} height={width * SCALING_FACTOR} />
      </View>
    ) : null;

    return (
      <View style={[styles.container, style]} onLayout={this.handleLayout}>
        <Gradient degrees={264} style={styles.container}>
          {tComponent}
        </Gradient>
      </View>
    );
  }
}

Placeholder.defaultProps = {
  style: null
};

Placeholder.propTypes = {
  style: ViewPropTypesStyle
};

export default Placeholder;
