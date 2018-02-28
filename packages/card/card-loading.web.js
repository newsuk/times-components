import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import Gradient from "@times-components/gradient";
import { ImageContainer, SummaryContainer, CardContainer } from "./card-styles";

const gradientStyles = StyleSheet.create({
  headerContainer: {
    height: 24,
    marginBottom: 10,
    maxWidth: 300
  },
  textContainer: {
    height: 10,
    marginBottom: 10
  },
  lastBar: {
    maxWidth: 240,
    marginBottom: 0
  }
});

const Loading = ({ aspectRatio, showImage }) => {
  const imageComponent = (
    <ImageContainer>
      <Image uri="" aspectRatio={aspectRatio} />
    </ImageContainer>
  );

  return (
    <CardContainer>
      {showImage && imageComponent}
      <SummaryContainer>
        <Gradient style={[gradientStyles.headerContainer]} degrees={264} />
        <Gradient style={[gradientStyles.textContainer]} degrees={267} />
        <Gradient style={[gradientStyles.textContainer]} degrees={267} />
        <Gradient
          style={[gradientStyles.textContainer, gradientStyles.lastBar]}
          degrees={267}
        />
      </SummaryContainer>
    </CardContainer>
  );
};

Loading.defaultProps = {
  aspectRatio: 3 / 2,
  showImage: false
};

Loading.propTypes = {
  aspectRatio: PropTypes.number,
  showImage: PropTypes.bool
};

export default Loading;
