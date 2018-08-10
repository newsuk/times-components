import React, { Component } from "react";
import { Modal, View } from "react-native";
import Caption from "@times-components/caption";
import Gestures from "@times-components/gestures";
import Button from "@times-components/link";
import { colours } from "@times-components/styleguide";
import Svg, { Path, G } from "@times-components/svgs";
import Image from "./image";
import {
  modalImageDefaultProps,
  modalImagePropTypes
} from "./modal-image-prop-types";
import styles, { captionStyles } from "./styles";

class ModalImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: props.show || false
    };
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  showModal() {
    this.setState({ showModal: true });
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { caption, credits } = this.props;

    const closeButton = (
      <Svg height={24} viewBox="0 0 24 24" width={24}>
        <G fill={colours.functional.white}>
          <Path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          <Path d="M0 0h24v24H0z" fill="none" />
        </G>
      </Svg>
    );

    return (
      <View>
        <Modal
          onRequestClose={this.hideModal}
          presentationStyle="fullScreen"
          visible={this.state.showModal}
        >
          <View style={styles.modal}>
            <View style={styles.buttonContainer}>
              <Button onPress={this.hideModal}>{closeButton}</Button>
            </View>
            <Gestures style={styles.imageContainer}>
              <Image {...this.props} style={styles.image} />
            </Gestures>
            <Caption credits={credits} style={captionStyles} text={caption} />
          </View>
        </Modal>
        <Button onPress={this.showModal}>
          <Image {...this.props} />
        </Button>
      </View>
    );
  }
}

ModalImage.propTypes = modalImagePropTypes;
ModalImage.defaultProps = modalImageDefaultProps;

export default ModalImage;
