import React, { Component } from "react";
import { Modal, View } from "react-native";
import Caption from "@times-components/caption";
import Gestures from "@times-components/gestures";
import Button from "@times-components/link";
import CloseButton from "./close-button";
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

    return (
      <View>
        <Modal
          onRequestClose={this.hideModal}
          presentationStyle="fullScreen"
          visible={this.state.showModal}
        >
          <View style={styles.modal}>
            <View style={styles.buttonContainer}>
              <CloseButton onPress={this.hideModal} />
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
