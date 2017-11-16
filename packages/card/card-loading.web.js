import React from "react";
import { StyleSheet, ViewPropTypes } from "react-native";
import Image from "@times-components/image";
import Gradient from "@times-components/gradient";
import { ImageContainer, SummaryContainer, CardContainer } from "./card-styles";

const { style: ViewPropTypesStyle } = ViewPropTypes;

const gradientStyles = StyleSheet.create({
  headerContainer: {
    height: 24,
    marginBottom: 10,
    maxWidth: 400
  },
  textContainer: {
    height: 10,
    marginBottom: 10
  },
  noMarginBottom: {
    marginBottom: 0
  }
});

const Loading = ({ style }) => {
  const imageComponent = (
    <ImageContainer>
      <Image uri="" aspectRatio={3 / 2} />
    </ImageContainer>
  );

  return (
    <CardContainer style={style}>
      {imageComponent}
      <SummaryContainer>
        <Gradient style={[gradientStyles.headerContainer]} degrees={264} />
        <Gradient style={[gradientStyles.textContainer]} degrees={267} />
        <Gradient style={[gradientStyles.textContainer]} degrees={267} />
        <Gradient
          style={[gradientStyles.textContainer, gradientStyles.noMarginBottom]}
          degrees={267}
        />
      </SummaryContainer>
    </CardContainer>
  );
};

Loading.defaultProps = {
  style: null
};

Loading.propTypes = {
  style: ViewPropTypesStyle
};

export default Loading;
