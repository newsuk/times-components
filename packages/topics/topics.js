import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import orderBy from "lodash.orderby";
import Topic from "./topic";
import styles from "./styles";

const Topics = ({ topics, style }) => {
  const orderedTopics = orderBy(topics, "order", "asc");

  return (
    <View style={[styles.topicGroup, style]}>
      {orderedTopics.map(topic => (
        <Topic key={topic.id} id={topic.id} name={topic.name} />
      ))}
    </View>
  );
};

Topics.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired
  }).isRequired).isRequired
}

export default Topics;
