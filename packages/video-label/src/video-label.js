import React from "react";
import { View } from "react-native";
import { TcText } from "@times-components/utils";
import { IconVideo } from "@times-components/icons";
import PropTypes from "prop-types";
import styled from "styled-components";
import styles from "./style";
import { checkStylesForUnits } from "@times-components/utils/dist/strings";

const VideoLabelText = styled(TcText)`
  ${checkStylesForUnits(styles.title)};
`;

const VideoLabel = ({ color, title }) => { 
  const textStyles = {
    ...styles.title
  };

  Object.assign(textStyles, { color });

  return (
  <View style={styles.container}>
    <View style={styles.iconContainer}>
      <IconVideo fillColour={color} height={9} />
    </View>
    <VideoLabelText style={textStyles}>
      {title ? title.toUpperCase() : "VIDEO"}
    </VideoLabelText>
  </View>
)};

VideoLabel.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string
};

VideoLabel.defaultProps = {
  color: "black",
  title: ""
};

export default VideoLabel;
