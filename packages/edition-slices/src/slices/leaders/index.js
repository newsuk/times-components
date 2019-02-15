import React from "react";
import { View, Text } from "react-native";
import { Leaders } from "@times-components/slice-layout";
import PropTypes from "prop-types";
import { TileM } from "../../tiles";
import styles from "./styles";
import MastHead from "./masthead";

const renderHead = () => (
  <View style={styles.mastheadContainer}>
    <MastHead />
    <View style={styles.headingContainer}>
      <Text style={[styles.heading, styles.text]}> Leading Articles </Text>
    </View>
  </View>
);

const LeadersSlice = ({ onPress, slice: { leader1, leader2, leader3 } }) => (
  <View style={styles.container}>
    {renderHead()}
    <Leaders
      renderLeader1={() => <TileM onPress={onPress} tile={leader1} />}
      renderLeader2={() => <TileM onPress={onPress} tile={leader2} />}
      renderLeader3={() => <TileM onPress={onPress} tile={leader3} />}
    />
  </View>
);

LeadersSlice.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    leader1: PropTypes.shape({}).isRequired,
    leader2: PropTypes.shape({}).isRequired,
    leader3: PropTypes.shape({}).isRequired
  }).isRequired
};

export default LeadersSlice;
