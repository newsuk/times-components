import React from "react";
import { View } from "react-native";
import Image from "@times-components/image";
import Gradient from "@times-components/gradient";
import { loadingPropTypes, loadingDefaultProps } from "./proptypes";
import styles from "./styles/shared";

const Loading = ({ aspectRatio, showImage }) => {
  const imageComponent = (
    <View style={styles.imageContainer}>
      <Image aspectRatio={aspectRatio} />
    </View>
  );

  return (
    <View>
      {showImage && imageComponent}
      <View>
        <Gradient style={styles.headerContainer} degrees={264} />
        <Gradient style={styles.textContainer} degrees={267} />
        <Gradient style={styles.textContainer} degrees={267} />
        <Gradient
          style={[styles.textContainer, styles.noMarginBottom]}
          degrees={267}
        />
      </View>
    </View>
  );
};

Loading.propTypes = loadingPropTypes;
Loading.defaultProps = loadingDefaultProps;

export default Loading;
