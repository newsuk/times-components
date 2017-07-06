import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5EFEB"
  },
  text: {
    fontFamily: "TimesModern-Bold"
  }
});

const Author = () =>
  <View style={styles.container}>
    <Text style={styles.text}>
      Author Bios!
    </Text>
  </View>;

export default Author;
