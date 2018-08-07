import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CenteredDecorator } from "@times-components/storybook";
import { fontSizes } from "@times-components/styleguide";
import Gestures from "./src/gestures";

const styles = StyleSheet.create({
  box: {
    backgroundColor: "red",
    height: 200,
    width: 200
  },
  eastWest: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  gestures: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },
  north: {
    alignItems: "center",
    justifyContent: "flex-start"
  },
  row: {
    flex: 1
  },
  south: {
    alignItems: "center",
    justifyContent: "flex-end"
  },
  text: {
    color: "yellow",
    fontSize: fontSizes.smallestHeadline,
    padding: 5
  }
});

export default {
  name: "Helpers/Gestures",
  children: [
    {
      type: "decorator",
      decorator: CenteredDecorator
    },
    {
      type: "story",
      platform: "native",
      name: "Default",
      component: () => (
        <Gestures style={styles.gestures}>
          <View style={styles.box}>
            <View style={[styles.row, styles.north]}>
              <Text style={styles.text}>N</Text>
            </View>
            <View style={[styles.row, styles.eastWest]}>
              <Text style={styles.text}>E</Text>
              <Text style={styles.text}>W</Text>
            </View>
            <View style={[styles.row, styles.south]}>
              <Text style={styles.text}>S</Text>
            </View>
          </View>
        </Gestures>
      )
    }
  ]
};
