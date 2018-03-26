import React from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import Svg, { G, Path } from "svgs";
import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

import PageLabel from "./page-label";

const textStyle = {
  height: 15,
  fontFamily: fonts.supporting,
  fontSize: fontSizes.pagingMeta,
  color: colours.functional.action
};

const container = {
  flexDirection: "row",
  ...Platform.select({
    web: {
      alignItems: "center"
    },
    android: {
      alignItems: "baseline"
    },
    ios: {
      alignItems: "center"
    }
  })
};

const styles = StyleSheet.create({
  nextContainer: Object.assign(
    {
      padding: 12
    },
    container
  ),
  previousContainer: Object.assign(
    {
      padding: 12
    },
    container
  ),
  nextText: Object.assign(
    {
      textAlign: "right",
      marginRight: spacing(2)
    },
    textStyle
  ),
  previousText: Object.assign(
    {
      textAlign: "left",
      marginLeft: spacing(2)
    },
    textStyle
  )
});

export const NextPageIcon = () => (
  <View style={styles.nextContainer} testID="pagination-button-next">
    <Text style={styles.nextText}>
      <PageLabel direction="Next" />
    </Text>
    <Svg width={7} height={12} viewBox="42 12 60 120">
      <G fill={colours.functional.action}>
        <Path d="M45.8,132L42,128.2,74.8,72,42,15.8,45.8,12,102,72Z" />
      </G>
    </Svg>
  </View>
);

export const PreviousPageIcon = () => (
  <View style={styles.previousContainer} testID="pagination-button-previous">
    <Svg width={7} height={12} viewBox="42 12 60 120">
      <G fill={colours.functional.action}>
        <Path d="M98.2,12l3.8,3.8L69.2,72,102,128.2,98.2,132,42,72Z" />
      </G>
    </Svg>
    <Text style={styles.previousText}>
      <PageLabel direction="Previous" />
    </Text>
  </View>
);
