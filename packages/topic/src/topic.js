import React from "react";
import { Text } from "react-native";
import TopicHead from "./topic-head";
import styles from "./styles";

export default ({ name, description }) => (
  <TopicHead name={name} description={description} />
);
