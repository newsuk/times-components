import React from "react";
import { Text, View } from "react-native";
import { IconVideo } from "@times-components/icons";
import PropTypes from "prop-types";
import styles from "./style";

const VideoLabel = ({ title, color }) => (
  <View style={{flexDirection:"row", alignItems: "center"}}>
    <IconVideo
      width={styles.title.fontSize * 1.5}
      height={styles.title.fontSize * 1.5}
      fillColor={color}
    />
    <Text style={[styles.title, { color , marginLeft:10}]}>VIDEO</Text>
    {title && <Text style={[styles.title, { color }]}> | {title}</Text>}
  </View>
);

VideoLabel.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string
};

VideoLabel.defaultProps = {
  color: "black"
};

export default VideoLabel;
