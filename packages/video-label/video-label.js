import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./style";

const VideoLabel = ({ title, color }) => (
  <Text style={[styles.title, { color }]}>{
    `## Video ${title ? `| ${title}`: ""}`
  }</Text>
);

VideoLabel.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string
};

VideoLabel.defaultProps = {
  color: "black"
};

export default VideoLabel;
