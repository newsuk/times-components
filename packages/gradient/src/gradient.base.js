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
      dimensions: { height: null, width: null }
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

    if (height || width) {
      return { height, width };
    }

    return dimensions;
  }

  render() {
    const { height, width } = this.getDimensions();
    const {
      children,
      degrees,
      startColour,
      endColour,
      endPoint,
      startPoint,
      style
    } = this.props;

    const { start, end } = angleToPoints(((degrees + 90) / 180) * Math.PI);

    const d = new Path()
      .line(width, 0)
      .line(0, height)
      .line(-width, 0)
      .line(0, -height);

    return (
      <View
        onLayout={this.onLayout}
        style={[{ height, width }, styles.container, style]}
      >
        <Surface height={height} style={styles.surface} width={width}>
          <Shape
            d={d}
            fill={
              new LinearGradient(
                {
                  [endPoint]: endColour,
                  [startPoint]: startColour
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
