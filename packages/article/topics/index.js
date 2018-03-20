import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Topics from "@times-components/topics";
import styles from "./styles";

const ShowTopics = ({ topics }) => {
  if (topics && topics.length > 0) {
    return (
      <View style={styles.topicsContainer}>
        <Topics topics={topics} />
      </View>
    );
  }

  return null;
};

ShowTopics.propTypes = {
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired
    }).isRequired
  )
};

ShowTopics.defaultProps = {
  topics: null
};

export default ShowTopics;
