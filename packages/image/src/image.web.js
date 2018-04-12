import React from "react";
import { View } from "react-native";
import Placeholder from "./placeholder";
import { defaultProps, propTypes } from "./image-proptypes";
import styles from "./styles";

const TimesImage = ({ uri, aspectRatio, style }) => {
  const imageStyles = {
    image: {
      display: "block",
      position: "absolute",
      width: "100%",
      zIndex: 1
    },
    placeholder: {
      paddingBottom: `${100 / aspectRatio}%`
    },
    wrapper: {
      display: "table",
      height: 0,
      overflow: "hidden"
    }
  };

  const boundedImg = (
    <div style={imageStyles.wrapper}>
      <img alt="" src={uri} style={imageStyles.image} />
      <Placeholder style={[styles.placeholder, imageStyles.placeholder]} />
    </div>
  );

  return style ? <View style={style}>{boundedImg}</View> : boundedImg;
};

TimesImage.propTypes = propTypes;
TimesImage.defaultProps = defaultProps;

export default TimesImage;
