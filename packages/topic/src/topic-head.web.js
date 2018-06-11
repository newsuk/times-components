import React, { Fragment } from "react";
import { Text, View } from "react-native";
import { propTypes, defaultProps } from "./topic-head-prop-types";
import {
  getHeadContainer,
  ResponsiveDivider,
  ResponsiveName
} from "./styles/responsive";
import styles from "./styles";

const TopicHead = ({ name, description, isLoading }) => {
  const HeadContainer = getHeadContainer({
    hasDescription: !!description
  });

  const showDescription = () =>
    description ? (
      <Fragment>
        <ResponsiveDivider />
        <Text testID="topic-description" style={styles.description}>
          {description}
        </Text>
      </Fragment>
    ) : null;

  return isLoading ? (
    <View style={styles.wrapper} />
  ) : (
    <View style={styles.wrapper}>
      <HeadContainer>
        <View style={styles.container}>
          <ResponsiveName
            testID="topic-name"
            accessibilityLabel="topic-name"
            accessibilityRole="heading"
          >
            {name}
          </ResponsiveName>
          {showDescription()}
        </View>
      </HeadContainer>
    </View>
  );
};

TopicHead.propTypes = propTypes;
TopicHead.defaultProps = defaultProps;

export default TopicHead;
