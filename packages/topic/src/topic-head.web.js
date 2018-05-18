import React from "react";
import { View } from "react-native";
import { propTypes, defaultProps } from "./topic-head-prop-types";
import { getHeadContainer } from "./styles/responsive";
import styles from "./styles";
import HeadContent from "./topic-head-content";
import Loading from "./topic-head-loading";

const TopicHead = ({ name, description, isLoading }) => {
  const HeadContainer = getHeadContainer({
    hasDescription: !!description
  });

  return isLoading ? (
    <Loading />
  ) : (
    <View style={styles.wrapper}>
      <HeadContainer>
        <HeadContent name={name} description={description} />
      </HeadContainer>
    </View>
  );
};

TopicHead.propTypes = propTypes;
TopicHead.defaultProps = defaultProps;

export default TopicHead;
