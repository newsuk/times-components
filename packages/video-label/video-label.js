import React from "react";
import { Text, View } from "react-native";
<<<<<<< HEAD
import { IconVideo } from "@times-components/icons";
=======
import { VideoIcon } from "@times-components/icons";
>>>>>>> feat: implements video-label
import PropTypes from "prop-types";
import styles from "./style";

const VideoLabel = ({ title, color }) => (
<<<<<<< HEAD
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <IconVideo height={styles.title.fontSize} fillColor={color} />
    <Text style={[styles.title, { color, marginLeft: 5 }]}>VIDEO</Text>
    {title ? <Text style={[styles.title, { marginLeft: 5 }]}>|</Text> : null}
    {title ? (
      <Text style={[styles.title, { color, paddingLeft: 5 }]}>
        {title.toUpperCase()}
      </Text>
    ) : null}
=======
<<<<<<< HEAD
  <View>
    <VideoIcon
      width={styles.title.fontSize}
      height={styles.title.fontSize}
      fillColor={color}
    />
    <Text style={[styles.title, { color }]}>Video</Text>
    {title && <Text style={[styles.title, { color }]}> | {Title}</Text>}
=======
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <IconVideo height={styles.title.fontSize} fillColor={color} />
    <Text style={[styles.title, { color, marginLeft: 5 }]}>VIDEO</Text>
    {title ? <Text style={[styles.title,{ marginLeft: 3 }]}>|</Text> : null}
    {title ? (
      <Text style={[styles.title, { color, paddingLeft: 3 }]}>{title}</Text>
    ) : null}
>>>>>>> ea4343f2... chore: refines video-label style
>>>>>>> feat: implements video-label
  </View>
);

VideoLabel.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string
};

VideoLabel.defaultProps = {
  title: "",
  color: "black"
};

export default VideoLabel;
