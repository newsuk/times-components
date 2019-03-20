import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { IconForwardArrow } from "@times-components/icons";
import { colours } from "@times-components/styleguide";
import styles from "./styles";

const PuzzleNotificationBar = ({ count, onPress }) =>
  count ? (
    <View style={styles.puzzleNotificationBarContainer}>
      <Text onPress={onPress} style={styles.puzzleNotificationBarText}>
        {count} recently opened puzzle
        {count > 1 && "s"}
      </Text>
      <View style={styles.puzzleNotificationBarArrow}>
        <IconForwardArrow fillColour={colours.section.puzzle} />
      </View>
    </View>
  ) : null;

PuzzleNotificationBar.propTypes = {
  count: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired
};

export default PuzzleNotificationBar;
