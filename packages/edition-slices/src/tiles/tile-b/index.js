import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { TileSummary } from "../shared";
import styles from "./styles";

const TileB = ({
  tile: {
    article: {
      flags,
      hasVideo,
      headline,
      label,
      section,
      shortHeadline,
      summary125
    }
  }
}) => (
  <View>
    <TileSummary
      flags={flags}
      hasVideo={hasVideo}
      headline={headline || shortHeadline}
      headlineStyle={styles.headline}
      label={label}
      section={section}
      style={styles.summaryContainer}
      summary={summary125}
    />
  </View>
);

TileB.propTypes = {
  tile: PropTypes.shape({}).isRequired
};

export default TileB;
