import React from "react";
import { View, Text } from "react-native";
import Context from "@times-components/context";
import { Leaders } from "@times-components/slice-layout";
import PropTypes from "prop-types";
import { TileM } from "../../tiles";
import styles from "./styles";
import MastHead from "./masthead";

const renderHead = pubName => (
  <View style={styles.mastheadContainer}>
    <MastHead publicationName={pubName} />
    <View style={styles.headingContainer}>
      <Text style={[styles.heading, styles.text]}> Leading Articles </Text>
    </View>
  </View>
);

const LeadersSlice = ({ onPress, slice: { leader1, leader2, leader3 } }) => (
  <Context.Consumer>
    {({ pubName }) => (
      <View style={styles.container}>
        {renderHead(pubName)}
        <Leaders
          renderLeader1={() => (
            <TileM onPress={onPress} tile={leader1} tileName="leader1" />
          )}
          renderLeader2={() => (
            <TileM onPress={onPress} tile={leader2} tileName="leader2" />
          )}
          renderLeader3={() => (
            <TileM onPress={onPress} tile={leader3} tileName="leader3" />
          )}
        />
      </View>
    )}
  </Context.Consumer>
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
