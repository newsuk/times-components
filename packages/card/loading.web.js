import React from "react";
import Image from "@times-components/image";
import Gradient from "@times-components/gradient";
import { loadingPropTypes, loadingDefaultProps } from "./proptypes";
import { ImageContainer, SummaryContainer, CardContainer } from "./card-styles";
import styles from "./styles/shared";

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
        <Gradient style={[styles.headerContainer]} degrees={264} />
        <Gradient style={[styles.textContainer]} degrees={267} />
        <Gradient style={[styles.textContainer]} degrees={267} />
        <Gradient
          style={[styles.textContainer, styles.noMarginBottom]}
          degrees={267}
        />
      </SummaryContainer>
    </CardContainer>
  );
};

Loading.propTypes = loadingPropTypes;
Loading.defaultProps = loadingDefaultProps;

export default Loading;
