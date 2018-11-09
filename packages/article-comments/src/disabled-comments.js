import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { TextLink } from "@times-components/link";
import styles from "./styles";

const DisabledComments = ({ onCommentGuidelinesPress }) => (
  <View style={styles.container}>
    <Text style={styles.headline}>
      Comments for this article have been turned off
    </Text>
    <Text style={styles.supporting}>
      For more details, please see our {"\n"}
      <TextLink onPress={onCommentGuidelinesPress} style={styles.link}>
        community guidelines
      </TextLink>
    </Text>
  </View>
);

DisabledComments.propTypes = {
  onCommentGuidelinesPress: PropTypes.func.isRequired
};

export default DisabledComments;
