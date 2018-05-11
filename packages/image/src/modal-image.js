import React, { Component } from "react";
import { Modal, View } from "react-native";
import Svg, { Path, G } from "svgs";
import Gestures from "@times-components/gestures";
import Button from "@times-components/link";
import { colours } from "@times-components/styleguide";
import Image from "./image";
import { defaultProps, propTypes } from "./image-prop-types";
import styles from "./styles";

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
    const closeButton = (
      <Svg height="24" viewBox="0 0 24 24" width="24">
        <G fill={colours.functional.cancel}>
          <Path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          <Path d="M0 0h24v24H0z" fill="none" />
        </G>
      </Svg>
    );

    return (
      <View>
        <Modal
          visible={this.state.showModal}
          onRequestClose={this.hideModal}
          presentationStyle="fullScreen"
        >
          <View style={styles.modal}>
            <Button onPress={this.hideModal}>{closeButton}</Button>
            <Gestures style={styles.imageContainer}>
              <Image {...this.props} style={styles.image} />
            </Gestures>
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
