import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import StylePropTypes from "react-style-proptype";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
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

const Gradient = ({ degrees, children, style }) => {
  const { start, end } = angleToPoints((degrees + 90) / 180 * Math.PI);

  return (
    <View style={style}>
      <LinearGradient
        start={start}
        end={end}
        locations={[0.0, 1.0]}
        colors={["#f9f9f9", "#ededed"]}
        style={[styles.container]}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

Gradient.defaultProps = {
  degrees: 0,
  children: null,
  style: null
};

Gradient.propTypes = {
  degrees: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  // eslint-disable-next-line react/no-typos
  style: StylePropTypes.supportingArrays
};

export default Gradient;
