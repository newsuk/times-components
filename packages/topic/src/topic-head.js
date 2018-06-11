import React, { Fragment } from "react";
import { Text, View } from "react-native";
import { propTypes, defaultProps } from "./topic-head-prop-types";
import styles from "./styles";

const TopicHead = ({ name, description, isLoading }) => {
  const showDescription = () =>
    description ? (
      <Fragment>
        <View style={styles.divider} />
        <Text testID="topic-description" style={styles.description}>
          {description}
        </Text>
      </Fragment>
    ) : null;

  return isLoading ? (
    <View style={styles.wrapper} />
  ) : (
    <View style={[styles.wrapper, description ? styles.paddingBottom : {}]}>
      <View style={styles.container}>
        <Text
          testID="topic-name"
          accessibilityLabel="topic-name"
          accessibilityRole="heading"
          style={styles.name}
        >
          {name}
        </Text>
        {showDescription()}
      </View>
    </View>
  );
};

TopicHead.propTypes = propTypes;
TopicHead.defaultProps = defaultProps;

export default TopicHead;
