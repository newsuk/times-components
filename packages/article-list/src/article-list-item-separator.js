import React from "react";
import { TcView } from "@times-components/utils";
import styles from "./styles";
import { ListItemSeparator } from "./styles/responsive";

const ArticleListItemSeparator = () => (
  <ListItemSeparator>
    <TcView style={styles.listItemSeparator} />
  </ListItemSeparator>
);

export default ArticleListItemSeparator;
