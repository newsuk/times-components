import React, { Fragment } from "react";
import { Text, View } from "react-native";
import { propTypes, defaultProps } from "./topic-head-prop-types";
import styles from "./styles";
import Divider from "./topic-head-divider";
import Name from "./topic-head-name";

const HeadContent = ({ name, description }) => {
  const showDescription = () =>
    description ? (
      <Fragment>
        <Divider />
        <Text testID="topic-description" style={styles.description}>
          {description}
        </Text>
      </Fragment>
    ) : null;

  return (
    <View style={styles.container}>
      <Name name={name} />
      {showDescription()}
    </View>
  );
};

HeadContent.propTypes = propTypes;
HeadContent.defaultProps = defaultProps;

export default HeadContent;
