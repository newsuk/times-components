import React, { Component, Fragment } from "react";
import { Modal, View } from "react-native";
import { ResponsiveContext } from "@times-components/responsive";
import Button from "@times-components/link";
import ImageViewer from "react-native-image-zoom-viewer";
import CloseButton from "../close-button";
import ModalCaptionContainer from "../modal-caption-container";
import Image from "../image";
import { modalPropTypes, modalDefaultProps } from "./modal-image-prop-types";
import styles, { captionStyles, tabletCaptionStyles } from "../styles";

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

  onLowResLayout(evt) {
    this.setState({ lowResImageWidth: evt.nativeEvent.layout.width });
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
    const { highResSize, index, onImagePress, images = [], uri } = this.props;
    if (onImagePress) {
      return (
        <Button onPress={() => onImagePress(index)}>
          <Image {...this.props} />
        </Button>
      );
    }
    const { showModal, lowResImageWidth, elementsVisible } = this.state;
    const lowResSize = highResSize || lowResImageWidth;
    const urls = [{ url: uri }].concat(
      images
        .map(i => ({
          url: i.attributes.url
        }))
        .filter(({ url }) => url !== uri)
    );

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
              {({ isTablet, screenWidth }) => (
                <Fragment>
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
                  <ImageViewer
                    imageUrls={urls}
                    renderIndicator={() => null}
                    enableSwipeDown
                    captureEvent
                    onSwipeDown={this.hideModal}
                    enablePreload
                    renderImage={({ source }) => [
                      <Image
                        {...this.props}
                        uri={source.uri}
                        highResSize={screenWidth}
                        lowResSize={lowResSize}
                        resizeMode="contain"
                        style={styles.modalImageContainer}
                      />
                    ]}
                  />
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
          <Image
            {...this.props}
            fill
            lowResSize={lowResSize}
            onLayout={this.onLowResLayout}
          />
        </Button>
      </View>
    );
  }
}

ModalImage.propTypes = modalPropTypes;
ModalImage.defaultProps = modalDefaultProps;

export default ModalImage;
