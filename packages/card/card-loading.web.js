import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import Gradient from "@times-components/gradient";
import {
  loadingPropTypes,
  loadingDefaultProps
} from "./card-loading-proptypes";
import styles from "./styles/shared";

const Loading = ({ aspectRatio, contentClass, imgClass, showImage }) => (
  <View style={styles.cardContainer}>
    {showImage && (
      <View style={styles.imgContainer} className={imgClass}>
        <Image aspectRatio={aspectRatio} />
      </View>
    )}
    <View style={styles.contentContainer} className={contentClass}>
      <Gradient style={[styles.headerContainer]} degrees={264} />
      <Gradient style={[styles.textContainer]} degrees={267} />
      <Gradient style={[styles.textContainer]} degrees={267} />
      <Gradient style={[styles.textContainer, styles.lastBar]} degrees={267} />
    </View>
  </View>
);

Loading.propTypes = {
  ...loadingPropTypes,
  contentClass: PropTypes.string,
  imgClass: PropTypes.string
};
Loading.defaultProps = {
  ...loadingDefaultProps,
  contentClass: "",
  imgClass: ""
};

export default Loading;
