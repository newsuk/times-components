import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { ListItemSeparator } from "./styles/responsive";

const ArticleListItemSeparator = () => (
  <ListItemSeparator>
    <View style={styles.listItemSeparator} />
  </ListItemSeparator>
);

export default ArticleListItemSeparator;
