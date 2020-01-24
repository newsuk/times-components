import React, { Fragment } from "react";
import { Text, View } from "react-native";
import renderTrees from "@times-components/markup-forest";
import coreRenderers from "@times-components/markup";
import { propTypes, defaultProps } from "./topic-head-prop-types";
import styles from "./styles";

const TopicHead = ({ name, description, isLoading }) => {
  const showDescription = () =>
    description.length > 0 ? (
      <Fragment>
        <View style={styles.divider} />
        <Text style={styles.description} testID="topic-description">
          {renderTrees(description, coreRenderers)}
        </Text>
      </Fragment>
    ) : null;

    const showTissotAd = () => (
      <Fragment>
        <Text>
          IN ASSOCIATION WITH
        </Text>
        <Image
        // eslint-disable-next-line global-require
        source={require("../assets/tissot_logo_official.png")} />

      </Fragment>
    )

  return isLoading ? (
    <View style={styles.wrapper} />
  ) : (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text
          accessibilityRole="header"
          style={styles.name}
          testID="topic-name"
        >
          {name}
        </Text>
        {showDescription()}
        {showTissotAd()}
      </View>
    </View>
  );
};

TopicHead.propTypes = propTypes;
TopicHead.defaultProps = defaultProps;

export default TopicHead;
