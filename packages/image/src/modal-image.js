import React, { Component } from "react";
import { Modal, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import Gestures from "@times-components/gestures";
import { ResponsiveContext } from "@times-components/responsive";
import Button from "@times-components/link";
import CloseButton from "./close-button";
import Image from "./image";
import { modalPropTypes, modalDefaultProps } from "./modal-image-prop-types";
import styles, { captionStyles, tabletCaptionStyles } from "./styles";

console.disableYellowBox = true;

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
    const { highResSize, onImagePress } = this.props;
    if (onImagePress) {
      return <Image {...this.props} />;
    }
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
                <SafeAreaView
                  forceInset={{
                    bottom: "never",
                    horizontal: "always",
                    top: "always"
                  }}
                  style={styles.topSafeView}
                />
                <View
                  style={[
                    styles.buttonContainer,
                    isTablet && styles.buttonContainerTablet
                  ]}
                >
                  <CloseButton isTablet={isTablet} onPress={this.hideModal} />
                </View>
                <SafeAreaView
                  forceInset={{ horizontal: "always", vertical: "always" }}
                  style={styles.middleSafeView}
                >
                  <Gestures style={styles.gestureContainer}>
                    <Image
                      {...this.props}
                      lowResSize={lowResSize}
                      style={styles.modalImageContainer}
                    />
                  </Gestures>
                </SafeAreaView>
                <SafeAreaView
                  forceInset={{
                    bottom: "always",
                    horizontal: "always",
                    top: "never"
                  }}
                  pointerEvents="none"
                  style={styles.bottomSafeView}
                >
                  {this.renderCaption({ isTablet })}
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
