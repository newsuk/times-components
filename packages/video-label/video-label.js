import React, { Fragment } from "react";
import { View, Text } from "react-native";
import { IconVideo } from "@times-components/icons";
import PropTypes from "prop-types";
import styles from "./style";
import beautifyTitle from "./beautify-title";

const showTitle = title => title && title.toLowerCase() !== "video";

const VideoLabel = ({ title, color }) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <IconVideo height={styles.title.fontSize} fillColor={color} />
    <Text style={[styles.title, { color, marginLeft: 5 }]}>
      {beautifyTitle("video")}
    </Text>
    {showTitle(title) ? (
      <Fragment>
        <Text style={[styles.pipe, { color, marginLeft: 5 }]}>|</Text>
        <Text style={[styles.title, { color, paddingLeft: 5 }]}>
          {beautifyTitle(title)}
        </Text>
      </Fragment>
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
