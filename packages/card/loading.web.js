import React from "react";
import { View } from "react-native";
import Image from "@times-components/image";
import Gradient from "@times-components/gradient";
import { loadingPropTypes, loadingDefaultProps } from "./proptypes";
import { CardContainer, getImageContainer } from "./styles/responsive";
import styles from "./styles/shared";

const Loading = ({ aspectRatio, childRatio, showImage }) => {
  const ImageContainer = getImageContainer();

  const imageComponent = (
    <ImageContainer>
      <Image uri="" aspectRatio={aspectRatio} />
    </ImageContainer>
  );

  return (
    <CardContainer>
      {showImage && imageComponent}
      <View style={{ flex: childRatio }}>
        <Gradient style={styles.headerContainer} degrees={264} />
        <Gradient style={styles.textContainer} degrees={267} />
        <Gradient style={styles.textContainer} degrees={267} />
        <Gradient
          style={[styles.textContainer, styles.noMarginBottom]}
          degrees={267}
        />
      </View>
    </CardContainer>
  );
};

Loading.propTypes = loadingPropTypes;
Loading.defaultProps = loadingDefaultProps;

export default Loading;
