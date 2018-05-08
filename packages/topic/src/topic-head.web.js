import React from "react";
import { View } from "react-native";
import { propTypes, defaultProps } from "./proptypes";
import { HeadContainer } from "./styles/responsive";
import styles from "./styles";
import HeadContent from "./topic-head-content";

const TopicHead = ({ name, description }) => (
  <View style={styles.wrapper}>
    <HeadContainer>
      <HeadContent name={name} description={description} />
    </HeadContainer>
  </View>
);

TopicHead.propTypes = propTypes;
TopicHead.defaultProps = defaultProps;

export default TopicHead;
