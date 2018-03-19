import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import Link from "@times-components/link";
import styles from "./styles";

const Topic = ({ id, name }) => (
  <Link url={`/topic/${id}`} onPress={() => null}>
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </View>
  </Link>
);

Topic.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Topic;
