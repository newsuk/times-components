import React from "react";
import { View } from "react-native";
import { propTypes, defaultProps } from "./proptypes";
import styles from "./styles";
import HeadContent from "./topic-head-content";

const TopicHead = ({ name, description }) => (
  <View style={styles.wrapper}>
    <HeadContent name={name} description={description} />
  </View>
);

TopicHead.propTypes = propTypes;
TopicHead.defaultProps = defaultProps;

export default TopicHead;
