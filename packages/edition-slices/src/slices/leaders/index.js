import React from "react";
import { View, Text } from "react-native";
import { SectionContext } from "@times-components/context";
import { Leaders } from "@times-components/slice-layout";
import PropTypes from "prop-types";
import { TileM, TileAG } from "../../tiles";
import styles from "./styles";
import { ResponsiveSlice } from "../shared";
import MastHead from "./masthead";

const headline = "Leading Articles";

const renderHead = publicationName => (
  <View style={styles.mastheadContainer}>
    <MastHead publicationName={publicationName} />
    <View style={styles.headingContainer}>
      <Text accessibilityRole="heading" style={[styles.heading, styles.text]}>
        {headline}
      </Text>
    </View>
  </View>
);

const LeadersSlice = ({ onPress, slice: { leader1, leader2, leader3 } }) => {
  const renderSmallSlice = breakpoint => (
    <Leaders
      breakpoint={breakpoint}
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
  );

  const renderHugeSlice = breakpoint => (
    <Leaders
      breakpoint={breakpoint}
      renderLeader1={() => (
        <TileAG onPress={onPress} tile={leader1} tileName="leader1" />
      )}
      renderLeader2={() => (
        <TileAG onPress={onPress} tile={leader2} tileName="leader2" />
      )}
      renderLeader3={() => (
        <TileAG onPress={onPress} tile={leader3} tileName="leader3" />
      )}
    />
  );

  return (
    <SectionContext.Consumer>
      {({ publicationName }) => (
        <View style={styles.container}>
          {renderHead(publicationName)}
          <ResponsiveSlice
            renderHuge={renderHugeSlice}
            renderMedium={renderSmallSlice}
            renderSmall={renderSmallSlice}
            renderWide={renderHugeSlice}
          />
        </View>
      )}
    </SectionContext.Consumer>
  );
};
LeadersSlice.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    leader1: PropTypes.shape({}).isRequired,
    leader2: PropTypes.shape({}).isRequired,
    leader3: PropTypes.shape({}).isRequired
  }).isRequired
};

export default LeadersSlice;
