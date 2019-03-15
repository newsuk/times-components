import React, { Component } from "react";
import { ART, View } from "react-native";
import angleToPoints from "./utils";
import styles from "./styles";
import { defaultProps, propTypes } from "./gradient-prop-types.base";

const { LinearGradient, Path, Shape, Surface } = ART;

class GradientBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: null
    };
  }

  onLayout = ({
    nativeEvent: {
      layout: { width, height }
    }
  }) => {
    this.setState({
      dimensions: {
        height,
        width
      }
    });
  };

  getDimensions() {
    const { dimensions } = this.state;
    const { height, width } = this.props;

    if (dimensions) {
      return dimensions;
    }

    return { height, width };
  }

  render() {
    const { height, width } = this.getDimensions();
    const { children, degrees, startColour, endColour, style } = this.props;

    const { start, end } = angleToPoints(((degrees + 90) / 180) * Math.PI);

    const d = new Path()
      .line(width, 0)
      .line(0, height)
      .line(-width, 0)
      .line(0, -height);

    const onLayoutProps = height && width ? {} : { onLayout: this.onLayout };

    return (
      <View
        {...onLayoutProps}
        style={[{ backgroundColor: startColour }, styles.container, style]}
      >
        <Surface height={height} style={styles.surface} width={width}>
          <Shape
            d={d}
            fill={
              new LinearGradient(
                {
                  "0": startColour,
                  "1": endColour
                },
                width * start.x,
                height * start.y,
                width * end.x,
                height * end.y
              )
            }
          />
        </Surface>
        {children}
      </View>
    );
  }
}

GradientBase.propTypes = propTypes;
GradientBase.defaultProps = defaultProps;

export default GradientBase;
