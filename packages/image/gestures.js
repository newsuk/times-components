import React, { Component } from "react";
import { View, PanResponder, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

const distanceBetweenTouches = (
  [{ pageX: x1, pageY: y1 }, { pageX: x2, pageY: y2 }]
) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

const angleBetweenTouches = (
  [{ pageX: x1, pageY: y1 }, { pageX: x2, pageY: y2 }]
) => {
  const opposite = y1 - y2;
  const adjacent = x1 - x2;
  const rad = Math.atan2(opposite, adjacent);
  const degrees = rad * 180 / Math.PI;
  return degrees;
};

class Gestures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomRatio: 1,
      angle: 0
    };
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, { numberActiveTouches }) =>
        numberActiveTouches > 1,
      onMoveShouldSetPanResponder: (e, { numberActiveTouches }) =>
        numberActiveTouches > 1,
      onStartShouldSetResponderCapture: (e, { numberActiveTouches }) =>
        numberActiveTouches > 1,
      onMoveShouldSetResponderCapture: (e, { numberActiveTouches }) =>
        numberActiveTouches > 1,
      onPanResponderStart: evt => {
        this.handlePinchStart(evt);
      },
      onPanResponderMove: evt => {
        this.handlePinchChange(evt);
      },
      onPanResponderRelease: () => {
        this.setState({ zoomRatio: 1, angle: 0 });
      } // TODO animate back to original position
    });
  }

  handlePinchStart({ nativeEvent: { touches } }) {
    this.startDistance = distanceBetweenTouches(touches);
    this.startAngle = angleBetweenTouches(touches);
  }

  handlePinchChange({ nativeEvent: { touches } }) {
    const zoomRatio = distanceBetweenTouches(touches) / this.startDistance;
    const currentAngle = angleBetweenTouches(touches);
    const angle = (currentAngle - this.startAngle) % 360;
    this.setState({ zoomRatio, angle });
  }

  render() {
    const transformStyle = {
      transform: [
        { scale: this.state.zoomRatio },
        { rotate: `${this.state.angle} deg` }
      ]
    };

    return (
      <View style={{ flexGrow: 1 }} {...this.panResponder.panHandlers}>
        <TouchableWithoutFeedback>
          <View {...this.props}>
            <View style={transformStyle}>{this.props.children}</View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

Gestures.propTypes = {
  children: PropTypes.element.isRequired
};

export default Gestures;
