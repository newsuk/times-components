import React from "react";
import { StyleSheet, View, ViewPropTypes } from "react-native";
import { Svg, G, Path } from "svgs";
import Gradient from "@times-components/gradient";
import { colours } from "@times-components/styleguide";

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
        <Svg
          width={width * SCALING_FACTOR}
          height={width * SCALING_FACTOR}
          viewBox="145 50 108 120"
          version="1.1"
        >
          <G stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <Path
              fill={colours.functional.contrast}
              d="M211.26076,54 L211.231367,54 L147.67512,54 L145,85.7081465 L146.922096,86.4489102 C146.922096,86.4489102 164.867589,68.1355181 168.301115,65.0001546 C171.728017,61.8689133 174.237132,61.0885763 176.436179,60.3527593 C180.998206,59.169681 185.977937,59.2150255 185.977937,59.2150255 L186.109581,59.2150255 L186.109581,156.560932 L169.259886,164.473953 L169.259886,166 L228.735147,166 L228.735147,164.473953 L211.889177,156.560932 L211.889177,59.2150255 L212.01751,59.2150255 C212.01751,59.2150255 216.992272,59.169681 221.558854,60.3527593 C223.757072,61.0885763 226.266601,61.8689133 229.691848,65.0001546 C233.130341,68.1355181 251.071695,86.4489102 251.071695,86.4489102 L253,85.7081465 L250.317842,54 L211.270695,54 L211.242545,54"
            />
          </G>
        </Svg>
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
