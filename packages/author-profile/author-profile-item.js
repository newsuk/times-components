import React from "react";
import { View } from "react-native";
import Card from "@times-components/card";

const AuthorProfileItem = item => {
  const props = {
    date: item.publishedTime,
    headline: item.title,
    image: {
      uri: item.leadAsset ? item.leadAsset.crop.url : ""
    },
    text: JSON.parse(item.teaser),
    label: item.label,
    publication: item.publicationName
  };

  return (
    <View
      style={{
        paddingBottom: 8,
        paddingTop: 8
      }}
    >
      <Card {...props} />
    </View>
  );
};

export default AuthorProfileItem;
