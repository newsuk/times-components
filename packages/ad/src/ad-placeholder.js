import React from "react";
import { Text, View } from "react-native";
import AdWatermark from "./ad-watermark";
import { propTypes, defaultProps } from "./ad-placeholder-prop-types";
import styles from "./styles";

const AdPlaceholder = ({ height, style, width }) => (
  <View style={[styles.placeholderContainer, style]}>
    <View style={[styles.placeholderWrapper, { height, width }]}>
      <View style={styles.watermarkContainer}>
        <AdWatermark height={height} width={width} />
      </View>
      <Text style={styles.placeholderText}>ADVERTISEMENT</Text>
    </View>
  </View>
);

AdPlaceholder.propTypes = propTypes;
AdPlaceholder.defaultProps = defaultProps;

export default AdPlaceholder;
