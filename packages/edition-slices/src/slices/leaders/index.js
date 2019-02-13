import React from "react";
import { View, Image, Text } from "react-native";
import { Leaders } from "@times-components/slice-layout";
import PropTypes from "prop-types";
import { TileM } from "../../tiles";
import styles from "./styles";

const renderHeader = () => (
  <View>
    <Image
      resizeMode="contain"
      // eslint-disable-next-line global-require
      source={require("../../../assets/leaders-masthead.png")}
      style={styles.mastheadStyle}
    />
    <View style={styles.leadTextContainer}>
      <Text style={[styles.leadText, styles.text]}> Leading Articles </Text>
    </View>
  </View>
);

const LeadersSlice = ({ leader1, leader2, leader3, onPress }) => (
  <Leaders
    renderHead={renderHeader}
    renderLeader1={() => <TileM onPress={onPress} tile={leader1} />}
    renderLeader2={() => <TileM onPress={onPress} tile={leader2} />}
    renderLeader3={() => <TileM onPress={onPress} tile={leader3} />}
  />
);

LeadersSlice.propTypes = {
  leader1: PropTypes.shape({}).isRequired,
  leader2: PropTypes.shape({}).isRequired,
  leader3: PropTypes.shape({}).isRequired,
  onPress: PropTypes.func.isRequired
};

export default LeadersSlice;
