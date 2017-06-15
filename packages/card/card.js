import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import ArticleSummary from "@newsint/article-summary";
import Image from "@newsint/image";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  imageContainer: {
    width: "40%",
    paddingRight: 17
  },
  image: {
    paddingRight: 5
  },
  summaryContainer: {
    paddingRight: "8%",
    width: "60%"
  }
});

export default function Card({
  label,
  headline,
  text,
  date,
  publication,
  image
}) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.summaryContainer}>
        <ArticleSummary
          label={label}
          headline={headline}
          text={text}
          date={date}
          publication={publication}
        />
      </View>
    </View>
  );
}
