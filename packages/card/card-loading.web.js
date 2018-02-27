import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import Gradient from "@times-components/gradient";
import {
  loadingPropTypes,
  loadingDefaultProps
} from "./card-loading-proptypes";
import {
  CardContainer,
  getChildContainer,
  ImageContainer
} from "./styles/responsive";
import styles from "./styles/shared";

const Loading = ({ aspectRatio, tabletChildRatio, showImage }) => {
  const ChildContainer = getChildContainer({ tabletChildRatio });

  return (
    <CardContainer>
      {showImage && (
        <ImageContainer>
          <Image aspectRatio={aspectRatio} />
        </ImageContainer>
      )}
      <ChildContainer>
        <Gradient style={[styles.headerContainer]} degrees={264} />
        <Gradient style={[styles.textContainer]} degrees={267} />
        <Gradient style={[styles.textContainer]} degrees={267} />
        <Gradient
          style={[styles.textContainer, styles.lastBar]}
          degrees={267}
        />
      </ChildContainer>
    </CardContainer>
  );
};

Loading.propTypes = {
  ...loadingPropTypes,
  tabletChildRatio: PropTypes.number
};
Loading.defaultProps = {
  ...loadingDefaultProps,
  tabletChildRatio: 1
};

export default Loading;
