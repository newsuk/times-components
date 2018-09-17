import React from "react";
import { Text, View } from "react-native";
import Watermark from "@times-components/watermark";
import { propTypes, defaultProps } from "./ad-placeholder-prop-types";
import styles, { calculateViewBox } from "./styles";

const AdPlaceholder = ({ height, style, width }) => {
  const box = calculateViewBox({ width, height });
  const viewBox = `${-box.marginLeft} ${-box.marginTop} ${box.svgWidth} ${
    box.svgHeight
  }`;
  return (
    <View style={[styles.placeholderContainer, style]}>
      <View
        style={[styles.placeholderWrapper, { height, width }]}
        testID="ad-placeholder"
      >
        <View style={styles.watermarkContainer}>
          <Watermark height={height} viewBox={viewBox} width={width} />
        </View>
        <Text style={styles.placeholderText}>ADVERTISEMENT</Text>
      </View>
    </View>
  );
};

AdPlaceholder.propTypes = propTypes;
AdPlaceholder.defaultProps = defaultProps;

export default AdPlaceholder;
