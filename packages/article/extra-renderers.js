import React from "react";
import { StyleSheet } from "react-native";
import Ad from "@times-components/ad";

const styles = StyleSheet.create({
  ad: {
    borderTopColor: "#dbdbdb",
    borderBottomColor: "#dbdbdb",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10
  }
});

const renderers = {
  ad(key) {
    return (
      <Ad key={key} code="intervention" section="article" style={styles.ad} />
    );
  }
};

export default renderers;
