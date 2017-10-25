import React from "react";
import { StyleSheet, View } from "react-native";
import StylePropTypes from "react-style-proptype";
import Gradient from "./gradient";
import T from "./t";

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
        <T width={width * 0.15} height={width * 0.15} />
      </View>
    ) : null;

    return (
      <View style={[styles.container, style]} onLayout={this.handleLayout}>
        <Gradient angle={264} style={[styles.container, styles.gradient]}>
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
  // eslint-disable-next-line react/no-typos
  style: StylePropTypes.supportingArrays
};

export default Placeholder;
