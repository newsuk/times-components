import React, { Component } from "react";
import { Modal, View, SafeAreaView, Image as RNImage } from "react-native";
import Gestures from "@times-components/gestures";
import { ResponsiveContext } from "@times-components/responsive";
import Button from "@times-components/link";
import CloseButton from "./close-button";
import Image from "./image";
import { modalPropTypes, modalDefaultProps } from "./modal-image-prop-types";
import styles, { captionStyles, tabletCaptionStyles } from "./styles";

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

  onLowResLayout({ width }) {
    this.setState({ lowResImageWidth: width });
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  showModal() {
    this.setState({ showModal: true });
  }

  renderCaption({ isTablet }) {
    const { caption } = this.props;
    const style = isTablet ? tabletCaptionStyles : captionStyles;

    if (!caption) {
      return null;
    }

    return React.cloneElement(caption, { style });
  }

  render() {
    const { highResSize } = this.props;
    const { showModal, lowResImageWidth } = this.state;
    const lowResSize = highResSize || lowResImageWidth;

    return (
      <View>
        <Modal
          onRequestClose={this.hideModal}
          presentationStyle="fullScreen"
          visible={showModal}
        >
          <ResponsiveContext.Consumer>
            {({ isTablet }) => (
              <View style={styles.modal}>
                <SafeAreaView style={styles.safeViewContainer}>
                  <View style={styles.safeViewInnerContainer}>
                    <View
                      style={[
                        styles.buttonContainer,
                        isTablet && styles.buttonContainerTablet
                      ]}
                    >
                      <CloseButton
                        isTablet={isTablet}
                        onPress={this.hideModal}
                      />
                    </View>
                    <Gestures style={styles.imageContainer}>
                      <Image
                        {...this.props}
                        lowResSize={lowResSize}
                        style={styles.image}
                      />
                    </Gestures>
                    {this.renderCaption({ isTablet })}
                  </View>
                </SafeAreaView>
              </View>
            )}
          </ResponsiveContext.Consumer>
        </Modal>
        <Button onPress={this.showModal}>
          <Image {...this.props} onImageLayout={this.onLowResLayout} />
        </Button>
      </View>
    );
  }
}

ModalImage.propTypes = modalPropTypes;
ModalImage.defaultProps = modalDefaultProps;

export default ModalImage;
