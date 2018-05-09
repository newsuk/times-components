import React from "react";
import { View } from "react-native";
import { propTypes, defaultProps } from "./proptypes";
import { HeadContainer } from "./styles/responsive";
import styles from "./styles";
import HeadContent from "./topic-head-content";
import Loading from "./topic-head-loading";

const TopicHead = ({ name, description, isLoading }) =>
  isLoading ? (
    <Loading />
  ) : (
    <View style={styles.wrapper}>
      <HeadContainer>
        <HeadContent name={name} description={description} />
      </HeadContainer>
    </View>
  );

TopicHead.propTypes = propTypes;
TopicHead.defaultProps = defaultProps;

export default TopicHead;
