import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

const KeyFacts = ({ data }) => {
  const { data: keyFactsData } = data;
  const renderKeyFact = (keyFact, index) => (
    <View key={index} style={styles.container}>
      <View style={styles.bullet} />
      <Text style={styles.text}>
        dskjhf sdjfh sdkjfskfhdskfsdkfdskjfdskj fsd fsdkf sdjf sdk hsk
      </Text>
    </View>
  );

  return keyFactsData.map((keyFact, index) => renderKeyFact(keyFact, index));
};

export default KeyFacts;
