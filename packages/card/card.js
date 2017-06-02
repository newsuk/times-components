// @flow

import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    justifyContent: "center"
  },
  title: {
    fontSize: 25,
    fontWeight: "bold"
  },
  image: {
    height: 400,
    marginVertical: 20,
    width: 400
  }
});

const Card = ({ children }) => <View style={styles.card}>{children}</View>;
const Title = ({ children }) => <Text style={styles.title}>{children}</Text>;
const Photo = ({ uri }) => <Image source={{ uri }} style={styles.image} />;

type Props = {
  title: string,
  uri: number
};

export default ({ title, uri }: Props) =>
  <Card>
    <Title>{title}</Title>
    <Photo uri={uri} />
  </Card>;
