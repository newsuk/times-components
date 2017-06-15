import React from "react";
import { StyleSheet, View } from "react-native";
import Card from "@newsint/card";

const rowStyle = isLast => {
  if (isLast) {
    return {};
  }
  return {
    borderBottomWidth: isLast ? 0 : 1,
    borderBottomColor: "#DBDBDB",
    paddingBottom: 12,
    marginBottom: 15
  };
};

export default function ArticleList({ articles }) {
  const cards = articles.map((props, i) =>
    <View style={rowStyle(i === articles.length - 1)}>
      <Card {...props} key={`articlelist-article-${i}`} />
    </View>
  );
  return <View>{cards}</View>;
}
