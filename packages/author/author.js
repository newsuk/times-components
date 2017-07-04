import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5EFEB"
  }
});

const Author = () =>
  <View style={styles.container}>
    <Text>
      Author Bios!
    </Text>
  </View>;

export default Author;
