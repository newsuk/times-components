import React, { Component } from "react";
import { View } from "react-native";
import { propTypes, defaultProps } from "./proptypes";
import styles from "./styles";
import HeadContent from "./topic-head-content";
import Loading from "./topic-head-loading";

const TopicHead = ({ name, description, isLoading }) => {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.wrapper}>
      <HeadContent name={name} description={description} />
    </View>
  );
};

TopicHead.propTypes = propTypes;
TopicHead.defaultProps = defaultProps;

export default TopicHead;
