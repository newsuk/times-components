import React from "react";
import PropTypes from "prop-types";

import { SectionContext } from "@times-components/context";
import { IconForwardArrow } from "@times-components/icons";
import { colours } from "@times-components/ts-styleguide";
import { TcText, TcView } from "@times-components/utils";
import styleFactory from "./styles";
 
const styles = styleFactory();

const PuzzleBar = ({ onPress }) => (
  <SectionContext.Consumer>
    {({ recentlyOpenedPuzzleCount: count }) =>
      count ? (
        <TcView style={styles.puzzleBarContainer}>
          <TcText onPress={onPress} style={styles.puzzleBarText}>
            {count} recently opened puzzle
            {count > 1 && "s"}
          </TcText>
          <TcView style={styles.puzzleBarArrow}>
            <IconForwardArrow fillColour={colours.section.puzzle} />
          </TcView>
        </TcView>
      ) : null
    }
  </SectionContext.Consumer>
);

PuzzleBar.propTypes = {
  onPress: PropTypes.func.isRequired
};

export default PuzzleBar;
