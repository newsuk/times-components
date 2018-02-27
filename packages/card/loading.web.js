import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import Gradient from "@times-components/gradient";
import { loadingPropTypes, loadingDefaultProps } from "./proptypes";
import { ImageContainer, CardContainer } from "./card-styles";
import styles from "./styles/shared";

const Loading = ({ aspectRatio, childRatio, showImage }) => {
  const imageComponent = (
    <ImageContainer>
      <Image uri="" aspectRatio={aspectRatio} />
    </ImageContainer>
  );

  return (
    <CardContainer>
      {showImage && imageComponent}
      <View style={{ flex: childRatio }}>
        <Gradient style={[styles.headerContainer]} degrees={264} />
        <Gradient style={[styles.textContainer]} degrees={267} />
        <Gradient style={[styles.textContainer]} degrees={267} />
        <Gradient
          style={[styles.textContainer, styles.noMarginBottom]}
          degrees={267}
        />
      </View>
    </CardContainer>
  );
};

Loading.propTypes = {
  ...loadingPropTypes,
  childRatio: PropTypes.number
};
Loading.defaultProps = {
  ...loadingDefaultProps,
  childRatio: 1
};

export default Loading;
