import React from "react";
import { Text, View } from "react-native";

const ArticleError = props => (
  <View>
    <Text>An error occurred</Text>
    <Text>{JSON.stringify(props, null, 2)}</Text>
  </View>
);

export default ArticleError;
