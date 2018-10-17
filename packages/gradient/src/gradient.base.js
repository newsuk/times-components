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
      height: 0,
      width: 0
    };
  }

  onLayout = ({
    nativeEvent: {
      layout: { width, height }
    }
  }) => {
    this.setState({
      height,
      width
    });
  };

  render() {
    const { height, width } = this.state;
    const { children, degrees, startColour, endColour, style } = this.props;

    const { start, end } = angleToPoints(((degrees + 90) / 180) * Math.PI);

    const d = new Path()
      .line(width, 0)
      .line(0, height)
      .line(-width, 0)
      .line(0, -height);

    return (
      <View onLayout={this.onLayout} style={[styles.container, style]}>
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
