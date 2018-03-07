import React from "react";
import { View } from "react-native";
import Image from "@times-components/image";
import Gradient from "@times-components/gradient";
import {
  loadingPropTypes,
  loadingDefaultProps
} from "./card-loading-proptypes";
import styles from "./styles/shared";

const Loading = ({
  contentContainerClass,
  imageContainerClass,
  imageRatio,
  showImage
}) => (
  <View style={styles.cardContainer}>
    {showImage && (
      <View style={styles.imageContainer} className={imageContainerClass}>
        <Image aspectRatio={imageRatio} />
      </View>
    )}
    <View style={styles.contentContainer} className={contentContainerClass}>
      <Gradient style={[styles.headerContainer]} degrees={264} />
      <Gradient style={[styles.textContainer]} degrees={267} />
      <Gradient style={[styles.textContainer]} degrees={267} />
      <Gradient style={[styles.textContainer, styles.lastBar]} degrees={267} />
    </View>
  </View>
);

Loading.propTypes = loadingPropTypes;
Loading.defaultProps = loadingDefaultProps;

export default Loading;
