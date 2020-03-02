import React, { Component, Fragment } from "react";
import { Modal, View, SafeAreaView } from "react-native";
import { ResponsiveContext } from "@times-components/responsive";
import Button from "@times-components/link";
import ImageViewer from "react-native-image-zoom-viewer";
import Url from "url-parse";
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
    const mainUrl = new Url(uri, true);
    mainUrl.query.offline = "true";
    const urls = [{ url: mainUrl.toString() }].concat(
      images
        .map(i => {
          const offlineUrl = new Url(i.attributes.url, true);
          offlineUrl.query.offline = "true";
          return { url: offlineUrl.toString() };
        })
        .filter(({ url }) => url !== mainUrl.toString())
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
              {({ isTablet }) => (
                <Fragment>
                  <SafeAreaView
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
                  </SafeAreaView>
                  <ImageViewer
                    imageUrls={urls}
                    renderIndicator={() => null}
                    enableSwipeDown
                    renderImage={({ source }) => {
                      const onlineUrl = new Url(source.uri, true);
                      delete onlineUrl.query.offline;
                      return (
                        <View style={styles.modalImageContainer}>
                          <Image
                            {...this.props}
                            uri={onlineUrl.toString()}
                            fill
                          />
                        </View>
                      );
                    }}
                    captureEvent
                    onSwipeDown={this.hideModal}
                    enablePreload
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
