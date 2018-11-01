import React, { Component } from "react";
import {
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  View
} from "react-native";
import PropTypes from "prop-types";

const distanceBetweenTouches = ([
  { pageX: x1, pageY: y1 },
  { pageX: x2, pageY: y2 }
]) =>
  // Android JS version doesn't support **
  // eslint-disable-next-line no-restricted-properties
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

const angleBetweenTouches = ([
  { pageX: x1, pageY: y1 },
  { pageX: x2, pageY: y2 }
]) => {
  const opposite = y1 - y2;
  const adjacent = x1 - x2;
  const rad = Math.atan2(opposite, adjacent);

  return (rad * 180) / Math.PI;
};

const pointBetweenTwoTouches = ([
  { pageX: x1, pageY: y1 },
  { pageX: x2, pageY: y2 }
]) => ({
  pageX: (x1 + x2) / 2,
  pageY: (y1 + y2) / 2
});

class Gestures extends Component {
  constructor(props) {
    super(props);

    this.state = {
      angle: new Animated.Value(0),
      center: { pageX: new Animated.Value(0), pageY: new Animated.Value(0) },
      viewLayout: {
        height: new Animated.Value(0),
        width: new Animated.Value(0),
        x: new Animated.Value(0),
        y: new Animated.Value(0)
      },
      zoomRatio: new Animated.Value(1)
    };

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, { numberActiveTouches }) =>
        numberActiveTouches > 1,
      onMoveShouldSetPanResponderCapture: (e, { numberActiveTouches }) =>
        numberActiveTouches > 1,
      onPanResponderMove: evt => {
        this.handlePinchChange(evt);
      },
      onPanResponderRelease: () => {
        Animated.parallel([
          Animated.spring(this.state.zoomRatio, {
            toValue: 1
          }),
          Animated.spring(this.state.angle, {
            toValue: 0
          })
        ]).start();
      },
      onPanResponderStart: evt => {
        this.handlePinchStart(evt);
      },
      onStartShouldSetPanResponder: (e, { numberActiveTouches }) =>
        numberActiveTouches > 1,
      onStartShouldSetPanResponderCapture: (e, { numberActiveTouches }) =>
        numberActiveTouches > 1
    });

    this.onViewLayout = this.onViewLayout.bind(this);
  }

  onViewLayout(evt) {
    const { x, y, width, height } = evt.nativeEvent.layout;

    this.state.viewLayout.x.setValue(x);
    this.state.viewLayout.y.setValue(y);
    this.state.viewLayout.width.setValue(width);
    this.state.viewLayout.height.setValue(height);
  }

  handlePinchStart({ nativeEvent: { touches } }) {
    this.startDistance = distanceBetweenTouches(touches);
    this.startAngle = angleBetweenTouches(touches);
  }

  handlePinchChange({ nativeEvent: { touches } }) {
    if (touches.length < 2) {
      return;
    }
    const zoomRatio = distanceBetweenTouches(touches) / this.startDistance;
    const currentAngle = angleBetweenTouches(touches);
    const angle = (currentAngle - this.startAngle) % 360;
    const center = pointBetweenTwoTouches(touches);

    this.state.zoomRatio.setValue(zoomRatio);
    this.state.angle.setValue(angle);
    this.state.center.pageX.setValue(center.pageX);
    this.state.center.pageY.setValue(center.pageY);
  }

  render() {
    const translateX = Animated.add(
      this.state.center.pageX,
      Animated.multiply(this.state.viewLayout.x, -1)
    );
    const translateY = Animated.add(
      this.state.center.pageY,
      Animated.multiply(this.state.viewLayout.y, -1)
    );

    const transformStyle = {
      transform: [
        { translateX: Animated.multiply(this.state.viewLayout.width, -0.5) },
        { translateY: Animated.multiply(this.state.viewLayout.height, -0.5) },
        { translateX },
        { translateY },
        { scale: this.state.zoomRatio },
        { translateX: Animated.multiply(translateX, -1) },
        { translateY: Animated.multiply(translateY, -1) },
        { translateX: Animated.divide(this.state.viewLayout.width, 2) },
        { translateY: Animated.divide(this.state.viewLayout.height, 2) },
        {
          rotate: this.state.angle.interpolate({
            inputRange: [0, 359],
            outputRange: ["0 deg", "359 deg"]
          })
        },
        { perspective: 1000 } // Required to make animations work on Android
      ]
    };

    return (
      <View
        onLayout={this.onViewLayout}
        style={{ flexGrow: 1 }}
        {...this.panResponder.panHandlers}
      >
        <TouchableWithoutFeedback>
          <View {...this.props}>
            <Animated.View style={transformStyle}>
              {this.props.children}
            </Animated.View>
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
