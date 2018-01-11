import React, { Component } from "react";
import { Modal, View, StyleSheet, PanResponder, Text, TouchableWithoutFeedback } from "react-native";
import Button from "@times-components/link";
import Svg, { Path, G } from "svgs";
import Image from "./image";
import { defaultProps, propTypes } from "./image-prop-types";

const style = StyleSheet.create({
  modal: {
    backgroundColor: "#000",
    width: "100%",
    height: "100%",
    flexDirection: "column"
  },
  imageContainer: {
    flexGrow: 1,
    justifyContent: "center"
  },
  image: {
    width: "100%"
  }
});

// √((x2 - x1)² + (y2 - y1)²)
const distanceBetweenTouches = ([
  { pageX: x1, pageY: y1 },
  { pageX: x2, pageY: y2 }
]) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

const angleBetweenTouches = ([
  { pageX: x1, pageY: y1 },
  { pageX: x2, pageY: y2 }
]) => {
  const opposite = y1 - y2;
  const adjacent = x1 - x2;
  const tan = opposite / adjacent;
  const rad = Math.atan2(opposite, adjacent)
  const degrees = rad * 180 / Math.PI
  return degrees
}

class ModalImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      angle: 0,
      zoomRatio: 1
    };
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, { numberActiveTouches }) => numberActiveTouches > 1,
      onMoveShouldSetPanResponder: (e, { numberActiveTouches }) => numberActiveTouches > 1,
      onStartShouldSetResponderCapture: (e, { numberActiveTouches }) => numberActiveTouches > 1,
      onMoveShouldSetResponderCapture: (e, { numberActiveTouches }) => numberActiveTouches > 1,
      onPanResponderStart: (evt) => { this.handlePinchStart(evt) },
      onPanResponderMove: (evt) => { this.handlePinchChange(evt) },
      onPanResponderRelease: () => { this.setState({ zoomRatio: 1, angle: 0 }) }, // TODO animate back to original position
    });
  }

  handlePinchStart({ nativeEvent: { touches } }) {
    this.startDistance = distanceBetweenTouches(touches)
    this.startAngle = angleBetweenTouches(touches)
  }

  handlePinchChange({ nativeEvent: { touches }}) {
    const zoomRatio = distanceBetweenTouches(touches) / this.startDistance
    const currentAngle = angleBetweenTouches(touches);
    const angle = (currentAngle - this.startAngle) % 360
    this.setState({ zoomRatio, angle })
  }

  showModal() {
    this.setState({ showModal: true });
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  render() {
    const closeButton = (
      <Svg height="48" viewBox="0 0 24 24" width="48">
        <G fill="#dddddd">
          <Path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          <Path d="M0 0h24v24H0z" fill="none" />
        </G>
      </Svg>
    );

    const transform = [
      { scale: this.state.zoomRatio },
      { rotate: `${this.state.angle} deg` }
    ];

    return (
      <View>
        <Modal
          visible={this.state.showModal}
          onRequestClose={this.hideModal}
          presentationStyle="fullScreen"
        >
          <View style={style.modal} {...this._panResponder.panHandlers}>
            <Button onPress={this.hideModal}>{closeButton}</Button>
            <TouchableWithoutFeedback>
              <View style={style.imageContainer}>
                <View>
                  <Image {...this.props} style={[style.image, {transform}]} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
        <Button onPress={this.showModal}>
          <Image {...this.props} />
        </Button>
      </View>
    );
  }
}

ModalImage.propTypes = propTypes;
ModalImage.defaultProps = defaultProps;

export default ModalImage;
