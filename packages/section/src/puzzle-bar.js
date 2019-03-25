import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { SectionContext } from "@times-components/context";
import { IconForwardArrow } from "@times-components/icons";
import { colours } from "@times-components/styleguide";
import styles from "./styles";

const PuzzleBar = ({ onPress }) => (
  <SectionContext.Consumer>
    {({ recentlyOpenedPuzzleCount: count }) =>
      count ? (
        <View style={styles.puzzleBarContainer}>
          <Text onPress={onPress} style={styles.puzzleBarText}>
            {count} recently opened puzzle
            {count > 1 && "s"}
          </Text>
          <View style={styles.puzzleBarArrow}>
            <IconForwardArrow fillColour={colours.section.puzzle} />
          </View>
        </View>
      ) : null
    }
  </SectionContext.Consumer>
);

PuzzleBar.propTypes = {
  onPress: PropTypes.func.isRequired
};

export default PuzzleBar;
