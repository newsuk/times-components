import React from "react";
import { View } from "react-native";
import Placeholder from "./placeholder";
import { defaultProps, propTypes } from "./image-prop-types";

const TimesImage = ({ aspectRatio, style, uri }) => {
  const styles = {
    img: { display: "block", width: "100%", zIndex: 1, position: "absolute" },
    placeholder: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 0
    },
    wrapper: {
      height: 0,
      overflow: "hidden",
      paddingBottom: `${100 / aspectRatio}%`,
      display: "table"
    }
  };

  return (
    <View style={style}>
      <div style={styles.wrapper}>
        <img alt="" src={uri} style={styles.img} />
        <Placeholder style={styles.placeholder} />
      </div>
    </View>
  );
};

TimesImage.propTypes = propTypes;
TimesImage.defaultProps = defaultProps;

export default TimesImage;
