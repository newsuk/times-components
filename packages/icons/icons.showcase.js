/* eslint-disable react/prop-types */
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colours, fonts } from "@times-components/ts-styleguide";
import * as Icons from "./src/icons";

const borderWidth = 1;
const borderColor = colours.functional.keyline;

const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
    borderBottomColor: borderColor,
    borderBottomWidth: borderWidth,
    borderRightColor: borderColor,
    borderRightWidth: borderWidth,
    flexGrow: 1,
    justifyContent: "center",
    padding: 20
  },
  label: {
    fontFamily: fonts.supporting,
    paddingTop: 15
  },
  wrapper: {
    borderLeftColor: borderColor,
    borderLeftWidth: borderWidth,
    borderTopColor: borderColor,
    borderTopWidth: borderWidth,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 20
  }
});

const renderIcon = color => args => {
  const name = args[0];
  const Icon = args[1];

  return (
    <View key={name} style={styles.icon}>
      <Icon
        fillColour={color(`Icon ${name} fill`, Icon.defaultProps.fillColour)}
        height={50}
        strokeColour={color(
          `Icon ${name} strike`,
          Icon.defaultProps.strokeColour
        )}
        width={50}
      />
      <Text style={styles.label}>{name}</Text>
    </View>
  );
};

export default {
  children: [
    {
      component: ({ color }) => (
        <ScrollView>
          <View style={styles.wrapper}>
            {Object.entries(Icons).map(renderIcon(color))}
          </View>
        </ScrollView>
      ),
      name: "Icons",
      type: "story"
    }
  ],
  name: "Primitives/Icons"
};
