import React from "react";
import { StyleSheet, View, ViewPropTypes } from "react-native";
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
        <T width={64} height={64} />
      </View>
    ) : null;

    return (
      <View style={[styles.container, style]}>
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
  style: ViewPropTypes.style
};

export default Placeholder;
