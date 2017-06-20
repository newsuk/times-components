import React from "react";
import { View } from "react-native";
import Card from "@newsint/card";

const rowStyle = isLast => {
  if (isLast) {
    return {};
  }
  return {
    borderBottomWidth: isLast ? 0 : 1,
    borderBottomColor: "#DBDBDB",
    paddingBottom: 9,
    marginBottom: 9
  };
};

export default function ArticleList({ articles }) {
  const cards = articles.map((props, i) =>
    <View
      style={rowStyle(i === articles.length - 1)}
      key={`articlelist-article-${i}`}
    >
      <Card {...props} />
    </View>
  );
  return <View>{cards}</View>;
}
