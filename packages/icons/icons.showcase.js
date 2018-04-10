/* eslint-disable react/prop-types */

import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { colours, fonts } from "@times-components/styleguide";
import { IconDiamond, IconTwitter, IconVideo } from "./src/icons";

const borderWidth = 1;
const borderColor = colours.functional.keyline;

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    margin: 20,
    borderLeftWidth: borderWidth,
    borderLeftColor: borderColor,
    borderTopWidth: borderWidth,
    borderTopColor: borderColor
  },
  icon: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: borderWidth,
    borderRightColor: borderColor,
    borderBottomWidth: borderWidth,
    borderBottomColor: borderColor
  },
  label: {
    paddingTop: 15,
    fontFamily: fonts.supporting
  }
});

export default {
  name: "Primitives/Icons",
  children: [
    {
      type: "story",
      name: "Icons",
      component: ({ color }) => (
        <View style={styles.wrapper}>
          <View style={styles.icon}>
            <IconDiamond
              width={50}
              height={50}
              fillColour={color(
                "Icon Diamond",
                IconDiamond.defaultProps.fillColour
              )}
            />
            <Text style={styles.label}>Diamond</Text>
          </View>
          <View style={styles.icon}>
            <IconTwitter
              width={50}
              height={50}
              fillColour={color(
                "Icon Twitter",
                IconTwitter.defaultProps.fillColour
              )}
            />
            <Text style={styles.label}>Twitter</Text>
          </View>
          <View style={styles.icon}>
            <IconVideo
              width={50}
              height={50}
              fillColour={color(
                "Icon Video",
                IconVideo.defaultProps.fillColour
              )}
            />
            <Text style={styles.label}>Video</Text>
          </View>
        </View>
      )
    }
  ]
};
