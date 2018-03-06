import React from "react";
import { Text, View } from "react-native";
import { IconVideo } from "@times-components/icons";
import PropTypes from "prop-types";
import styles from "./style";

const VideoLabel = ({ title, color }) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <IconVideo height={styles.title.fontSize} fillColor={color} />
    <Text style={[styles.title, { color, marginLeft: 5 }]}>VIDEO</Text>
    {title ? <Text style={[styles.title, { marginLeft: 5 }]}>|</Text> : null}
    {title ? (
      <Text style={[styles.title, { color, paddingLeft: 5 }]}>
        {title.toUpperCase()}
      </Text>
    ) : null}
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
