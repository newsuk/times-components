import React, { Component } from "react";
import { Modal, View, SafeAreaView } from "react-native";
import Gestures from "@times-components/gestures";
import Button from "@times-components/link";
import CloseButton from "./close-button";
import Image from "./image";
import { modalPropTypes, modalDefaultProps } from "./modal-image-prop-types";
import styles, { captionStyles } from "./styles";

class ModalImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lowResSize: null,
      showModal: props.show || false
    };
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.onLowResLayout = this.onLowResLayout.bind(this);
  }

  onLowResLayout({
    nativeEvent: {
      layout: { width }
    }
  }) {
    this.setState({ lowResSize: width });
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  showModal() {
    this.setState({ showModal: true });
  }

  render() {
    const { caption } = this.props;
    const { showModal, lowResSize } = this.state;

    const captionWithStyles =
      caption &&
      React.cloneElement(caption, {
        style: captionStyles
      });

    return (
      <View>
        <Modal
          onRequestClose={this.hideModal}
          presentationStyle="fullScreen"
          visible={showModal}
        >
          <View style={styles.modal}>
            <SafeAreaView style={styles.safeViewContainer}>
              <View style={styles.buttonContainer}>
                <CloseButton onPress={this.hideModal} />
              </View>
              <Gestures style={styles.imageContainer}>
                <Image
                  {...this.props}
                  lowResSize={lowResSize}
                  style={styles.image}
                />
              </Gestures>
              {captionWithStyles}
            </SafeAreaView>
          </View>
        </Modal>
        <Button onPress={this.showModal}>
          <Image {...this.props} onLayout={this.onLowResLayout} />
        </Button>
      </View>
    );
  }
}

ModalImage.propTypes = modalPropTypes;
ModalImage.defaultProps = modalDefaultProps;

export default ModalImage;
