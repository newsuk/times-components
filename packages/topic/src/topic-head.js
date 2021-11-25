import React, { Fragment } from "react";
import { Text, View } from "react-native";
import renderTrees from "@times-components/markup-forest";
import coreRenderers from "@times-components/markup";
import { propTypes, defaultProps } from "./topic-head-prop-types";
import {
  HeadContainer,
  HeadContainerWithDescription,
  ResponsiveDivider,
  ResponsiveName
} from "./styles/responsive";
import styles from "./styles";

const TopicHead = ({ name, description, isLoading }) => {
  const Container =
    description && description.length
      ? HeadContainerWithDescription
      : HeadContainer;

  const showDescription = () =>
    description && description.length > 0 ? (
      <Fragment>
        <ResponsiveDivider />
        <Text style={styles.description} testID="topic-description">
          {renderTrees(description, coreRenderers)}
        </Text>
      </Fragment>
    ) : null;

  return isLoading ? (
    <View style={styles.wrapper} />
  ) : (
    <View style={styles.wrapper}>
      <Container>
        <ResponsiveName accessibilityRole="header" testID="topic-name">
          {name}
        </ResponsiveName>
        {showDescription()}
      </Container>
    </View>
  );
};

TopicHead.propTypes = propTypes;
TopicHead.defaultProps = defaultProps;

export default TopicHead;
