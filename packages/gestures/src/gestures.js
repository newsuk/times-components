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
      zoomRatio: new Animated.Value(1),
      viewLayout: { width: 0, height: 0, x: 0, y: 0 },
      center: { pageX: new Animated.Value(0), pageY: new Animated.Value(0) }
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

    this.state.zoomRatio.setValue(zoomRatio);
    this.state.angle.setValue(angle);

    const center = pointBetweenTwoTouches(touches);
    this.state.center.pageX.setValue(center.pageX);
    this.state.center.pageY.setValue(center.pageY);
  }

  onViewLayout(evt) {
    this.setState({ viewLayout: evt.nativeEvent.layout });
  }

  render() {
    console.log(this.state.viewLayout.x, this.state.viewLayout.y);
    const translateX = Animated.add(this.state.center.pageX, new Animated.Value(-this.state.viewLayout.x));
    const translateY = Animated.add(this.state.center.pageY, new Animated.Value(-this.state.viewLayout.y));

    const transformStyle = {
      transform: [
        { translateX: -(this.state.viewLayout.width / 2) },
        { translateY: -(this.state.viewLayout.height / 2) },
        { translateX },
        { translateY },
        { scale: this.state.zoomRatio },
        {
          rotate: this.state.angle.interpolate({
            inputRange: [0, 359],
            outputRange: ["0 deg", "359 deg"]
          })
        },
        { translateX: Animated.multiply(translateX, new Animated.Value(-1)) },
        { translateY: Animated.multiply(translateY, new Animated.Value(-1)) },
        { translateX: this.state.viewLayout.width / 2 },
        { translateY: this.state.viewLayout.height / 2 },
        { perspective: 1000 } // Required to make animations work on Android
      ]
    };

    return (
      <View style={{ flexGrow: 1 }} {...this.panResponder.panHandlers} onLayout={this.onViewLayout}>
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
