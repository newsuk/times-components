import React from "react";
import { View } from "react-native";
import Topics from "@times-components/topics";
import styles from "./styles";

const ShowTopics = ({topics}) => {
  if(topics && topics.length > 0) {
    return (
      <View style={styles.topicsContainer}>
        <Topics topics={topics} />
      </View>
    );
  }

  return null;
}

export default ShowTopics;
