import React, { Component } from "react";
import { View, ViewPropTypes } from "react-native";
import Gradient from "@times-components/gradient";
import styles from "./styles/index";
import T from "./t";

const { style: ViewPropTypesStyle } = ViewPropTypes;

class Placeholder extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleLayout = this.handleLayout.bind(this);
  }

  handleLayout({
    nativeEvent: {
      layout: { width }
    }
  }) {
    this.setState({
      width
    });
  }

  render() {
    const { style } = this.props;
    const { width } = this.state;

    return (
      <View onLayout={this.handleLayout} style={[styles.container, style]}>
        <Gradient degrees={264} style={styles.container}>
          {width ? (
            <View style={[styles.container, styles.placeholderContainer]}>
              <T width={width} />
            </View>
          ) : null}
        </Gradient>
      </View>
    );
  }
}

Placeholder.propTypes = {
  style: ViewPropTypesStyle
};

Placeholder.defaultProps = {
  style: null
};

export default Placeholder;
