import React, { Component } from "react";
import { Animated, PanResponder, View } from "react-native";
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

const translate = ({ translateX, translateY }, transformations) => [
  { translateX },
  { translateY },
  ...transformations,
  { translateX: Animated.multiply(translateX, -1) },
  { translateY: Animated.multiply(translateY, -1) }
];

const resetOrigin = ({ width, height }, transformations) =>
  translate(
    {
      translateX: Animated.multiply(width, -0.5),
      translateY: Animated.multiply(height, -0.5)
    },
    transformations
  );

const subtract = (a, b) => Animated.add(a, Animated.multiply(b, -1));

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
        const { angle, zoomRatio } = this.state;
        Animated.parallel([
          Animated.spring(zoomRatio, {
            toValue: 1
          }),
          Animated.spring(angle, {
            toValue: 0
          })
        ]).start();
      },
      onPanResponderStart: evt => {
        this.handlePinchStart(evt);
      },
      // Required for iOS support
      // https://github.com/facebook/react-native/issues/14295#issuecomment-389971835
      onPanResponderTerminationRequest: () => false,
      onStartShouldSetPanResponder: (e, { numberActiveTouches }) =>
        numberActiveTouches > 1,
      onStartShouldSetPanResponderCapture: (e, { numberActiveTouches }) =>
        numberActiveTouches > 1
    });

    this.onViewLayout = this.onViewLayout.bind(this);
  }

  onViewLayout(evt) {
    const { viewLayout } = this.state;
    const { x, y, width, height } = evt.nativeEvent.layout;

    viewLayout.x.setValue(x);
    viewLayout.y.setValue(y);
    viewLayout.width.setValue(width);
    viewLayout.height.setValue(height);
  }

  handlePinchStart({ nativeEvent: { touches } }) {
    this.startDistance = distanceBetweenTouches(touches);
    this.startAngle = angleBetweenTouches(touches);
  }

  handlePinchChange({ nativeEvent: { touches } }) {
    const {
      angle: stateAngle,
      center: stateCenter,
      zoomRatio: stateZoomRatio
    } = this.state;
    if (touches.length < 2) {
      return;
    }
    const zoomRatio = distanceBetweenTouches(touches) / this.startDistance;
    const currentAngle = angleBetweenTouches(touches);
    const angle = (currentAngle - this.startAngle) % 360;
    const center = pointBetweenTwoTouches(touches);

    stateZoomRatio.setValue(zoomRatio);
    stateAngle.setValue(angle);
    stateCenter.pageX.setValue(center.pageX);
    stateCenter.pageY.setValue(center.pageY);
  }

  render() {
    const { children, style } = this.props;
    const { angle, center, viewLayout, zoomRatio } = this.state;

    const transformStyle = {
      transform: [
        ...resetOrigin(
          viewLayout,
          translate(
            {
              translateX: subtract(center.pageX, viewLayout.x),
              translateY: subtract(center.pageY, viewLayout.y)
            },
            [{ scale: zoomRatio }]
          )
        ),
        {
          rotate: angle.interpolate({
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
        style={style}
        {...this.panResponder.panHandlers}
      >
        <Animated.View
          {...this.props}
          style={[{ flexGrow: 1 }, transformStyle]}
        >
          {children}
        </Animated.View>
      </View>
    );
  }
}

Gestures.propTypes = {
  children: PropTypes.element.isRequired
};

export default Gestures;
