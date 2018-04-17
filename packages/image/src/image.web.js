import React from "react";
import { View } from "react-native";
import Placeholder from "./placeholder";
import { defaultProps, propTypes } from "./image-prop-types";

const TimesImage = ({ aspectRatio, style, uri }) => {
  const styles = {
    wrapper: {
      height: 0,
      overflow: "hidden",
      paddingBottom: `${100 / aspectRatio}%`,
      display: "table"
    },
    placeholder: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 0
    },
    img: { display: "block", width: "100%", zIndex: 1, position: "absolute" }
  };

  const boundedImg = (
    <div style={styles.wrapper}>
      <img src={uri} style={styles.img} alt="" />
      <Placeholder style={styles.placeholder} />
    </div>
  );

  return style ? <View style={style}>{boundedImg}</View> : boundedImg;
};

TimesImage.defaultProps = defaultProps;
TimesImage.propTypes = propTypes;

export default TimesImage;
