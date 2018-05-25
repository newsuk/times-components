import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View, ViewPropTypes, ART } from "react-native";
import { colours } from "@times-components/styleguide";

const { Surface, Shape, LinearGradient, Path } = ART;

const { style: ViewPropTypesStyle } = ViewPropTypes;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  surface: { position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }
});

function angleToPoints(angle) {
  const segment = Math.floor(angle / Math.PI * 2) + 2;
  const diagonal = (1 / 2 * segment + 1 / 4) * Math.PI;
  const op = Math.cos(Math.abs(diagonal - angle)) * Math.sqrt(2);
  const x = op * Math.cos(angle);
  const y = op * Math.sin(angle);

  return {
    start: {
      x: x < 0 ? 1 : 0,
      y: y < 0 ? 1 : 0
    },
    end: {
      x: x >= 0 ? x : x + 1,
      y: y >= 0 ? y : y + 1
    }
  };
}

class Gradient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    };
  }

  onLayout = ({ nativeEvent: { layout: { width, height } } }) => {
    this.setState({ width, height });
  };

  render() {
    const { width, height } = this.state;
    const { degrees, children, style } = this.props;

    const { start, end } = angleToPoints((degrees + 90) / 180 * Math.PI);

    const d = new Path()
      .line(width, 0)
      .line(0, height)
      .line(-width, 0)
      .line(0, -height);

    return (
      <View style={[styles.container, style]} onLayout={this.onLayout}>
        <Surface width={width} height={height} style={styles.surface}>
          <Shape
            fill={
              new LinearGradient(
                {
                  "0": colours.functional.backgroundPrimary,
                  "1": colours.functional.backgroundSecondary
                },
                width * start.x,
                height * start.y,
                width * end.x,
                height * end.y
              )
            }
            d={d}
          />
        </Surface>
        {children}
      </View>
    );
  }
}

Gradient.defaultProps = {
  degrees: 265,
  children: null,
  style: null
};

Gradient.propTypes = {
  degrees: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  style: ViewPropTypesStyle
};

export default Gradient;
