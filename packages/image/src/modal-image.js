import React, { Component, Fragment } from "react";
import { Modal, View } from "react-native";
import Gestures from "@times-components/gestures";
import { ResponsiveContext } from "@times-components/responsive";
import Button from "@times-components/link";
import CloseButton from "./close-button";
import ModalCaptionContainer from "./modal-caption-container";
import SafeAreaView from "./react-native-safe-area";
import Image from "./image";
import { modalPropTypes, modalDefaultProps } from "./modal-image-prop-types";
import styles, { captionStyles, tabletCaptionStyles } from "./styles";

class ModalImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementsVisible: true,
      lowResImageWidth: null,
      showModal: props.show || false
    };
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.onLowResLayout = this.onLowResLayout.bind(this);
    this.toggleElements = this.toggleElements.bind(this);
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

  toggleElements() {
    this.setState(({ elementsVisible }) => ({
      elementsVisible: !elementsVisible
    }));
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
    const { highResSize, index, onImagePress } = this.props;
    if (onImagePress) {
      return (
        <Button onPress={() => onImagePress(index)}>
          <Image {...this.props} />
        </Button>
      );
    }
    const { showModal, lowResImageWidth, elementsVisible } = this.state;
    const lowResSize = highResSize || lowResImageWidth;

    return (
      <View>
        <Modal
          animationType="slide"
          onRequestClose={this.hideModal}
          presentationStyle="fullScreen"
          supportedOrientations={["portrait", "landscape"]}
          visible={showModal}
        >
          <View style={styles.modal}>
            <ResponsiveContext.Consumer>
              {({ isTablet }) => (
                <Fragment>
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
                    {elementsVisible ? (
                      <CloseButton
                        isTablet={isTablet}
                        onPress={this.hideModal}
                      />
                    ) : null}
                  </View>
                  <SafeAreaView
                    forceInset={{ horizontal: "always", vertical: "always" }}
                    style={styles.middleSafeView}
                  >
                    <Gestures
                      onPress={this.toggleElements}
                      onSwipeDown={this.hideModal}
                      style={styles.gestureContainer}
                    >
                      <Image
                        {...this.props}
                        lowResSize={lowResSize}
                        style={styles.modalImageContainer}
                      />
                    </Gestures>
                  </SafeAreaView>
                  {elementsVisible ? (
                    <ModalCaptionContainer
                      pointerEvents="none"
                      style={styles.bottomSafeView}
                    >
                      {this.renderCaption({ isTablet })}
                    </ModalCaptionContainer>
                  ) : null}
                </Fragment>
              )}
            </ResponsiveContext.Consumer>
          </View>
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
