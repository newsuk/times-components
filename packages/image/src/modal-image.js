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
      lowResImageWidth: null,
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
    this.setState({ lowResImageWidth: width });
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  showModal() {
    this.setState({ showModal: true });
  }

  render() {
    const { caption, highResSize, aspectRatio } = this.props;
    const { showModal, lowResImageWidth } = this.state;
    const lowResSize = highResSize || lowResImageWidth;
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
              <View style={styles.safeViewInnerContainer}>
                <View style={styles.buttonContainer}>
                  <CloseButton onPress={this.hideModal} />
                </View>
                <Gestures style={styles.imageContainer}>
                  <Image
                    {...this.props}
                    lowResSize={lowResSize}
                    style={[
                      styles.image,
                      aspectRatio >= 1
                        ? styles.imageFullWidth
                        : styles.imageFullHeight
                    ]}
                  />
                </Gestures>
                {captionWithStyles}
              </View>
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
