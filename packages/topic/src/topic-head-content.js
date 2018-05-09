import React, { Fragment } from "react";
import { Text, View } from "react-native";
import { propTypes, defaultProps } from "./proptypes";
import styles from "./styles";
import Divider from "./divider";
import Name from "./name";

const HeadContent = ({ name, description }) => {
  const showDescription = () => {
    if (!description) return null;
    return (
      <Fragment>
        <Divider />
        <Text testID="topic-description" style={styles.description}>
          {description}
        </Text>
      </Fragment>
    );
  };

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
