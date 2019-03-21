import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { SectionContext } from "@times-components/context";

const PuzzleBar = ({ onPress }) => (
  <SectionContext.Consumer>
    {({ recentlyOpenedPuzzleCount }) =>
      recentlyOpenedPuzzleCount ? (
        <Text onPress={onPress} style={{ backgroundColor: "red" }}>
          Recently opened {recentlyOpenedPuzzleCount} puzzles
        </Text>
      ) : null
    }
  </SectionContext.Consumer>
);

PuzzleBar.propTypes = {
  onPress: PropTypes.func.isRequired
};

export default PuzzleBar;
