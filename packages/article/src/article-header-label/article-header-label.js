import React from "react";
import { View } from "react-native";
import BaseLabel from "./article-header-label.base";
import styles from "../styles/article-header";

export default BaseLabel((props, label) => (
  <View {...props} style={styles.articleLabelWrapper}>
    {label}
  </View>
));
