import React from "react";
import { View } from "react-native";
import { propTypes, defaultProps } from "./proptypes";
import styles from "./styles";
import HeadContent from "./topic-head-content";
import Loading from "./topic-head-loading";

const TopicHead = ({ name, description, isLoading }) =>
  isLoading ? (
    <Loading />
  ) : (
    <View style={[styles.wrapper, description ? styles.paddingBottom : {}]}>
      <HeadContent name={name} description={description} />
    </View>
  );

TopicHead.propTypes = propTypes;
TopicHead.defaultProps = defaultProps;

export default TopicHead;
