import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { storiesOf } from "dextrose/storiesOfOverloader";
import { CenteredDecorator } from "@times-components/storybook/decorators";
import Gestures from "./gestures";

const styles = StyleSheet.create({
  gestures: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: "red"
  },
  row: {
    flex: 1
  },
  north: {
    alignItems: "center",
    justifyContent: "flex-start"
  },
  ew: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  south: {
    alignItems: "center",
    justifyContent: "flex-end"
  },
  text: {
    color: "yellow",
    fontSize: 20,
    padding: 5
  }
});

storiesOf("Gestures", module)
  .addDecorator(CenteredDecorator)
  .add("With a View", () => (
    <Gestures style={styles.gestures}>
      <View style={styles.box}>
        <View style={[styles.row, styles.north]}>
          <Text style={styles.text}>N</Text>
        </View>
        <View style={[styles.row, styles.ew]}>
          <Text style={styles.text}>E</Text>
          <Text style={styles.text}>W</Text>
        </View>
        <View style={[styles.row, styles.south]}>
          <Text style={styles.text}>S</Text>
        </View>
      </View>
    </Gestures>
  ));
