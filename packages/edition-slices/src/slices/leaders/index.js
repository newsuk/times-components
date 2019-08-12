import React, { Component } from "react";
import { View, Text } from "react-native";
import { SectionContext } from "@times-components/context";
import { Leaders } from "@times-components/slice-layout";
import PropTypes from "prop-types";
import { TileM, TileAG } from "../../tiles";
import styleFactory from "./styles";
import { ResponsiveSlice } from "../shared";
import MastHead from "./masthead";

const renderHead = (styles, breakpoint) => (
  <SectionContext.Consumer>
    {({ publicationName }) => (
      <View style={styles.mastheadContainer}>
        <MastHead breakpoint={breakpoint} publicationName={publicationName} />
        <View style={styles.headingContainer}>
          <Text style={[styles.heading, styles.text]}> Leading Articles </Text>
        </View>
      </View>
    )}
  </SectionContext.Consumer>
);

class LeadersSlice extends Component {
  constructor(props) {
    super(props);
    this.renderSmall = this.renderSmall.bind(this);
    this.renderHuge = this.renderHuge.bind(this);
  }

  renderSmall(breakpoint) {
    const {
      onPress,
      slice: { leader1, leader2, leader3 }
    } = this.props;
    const styles = styleFactory(breakpoint);

    return (
      <View style={styles.container}>
        {renderHead(styles, breakpoint)}
        <Leaders
          breakpoint={breakpoint}
          leader1={
            <TileM
              breakpoint={breakpoint}
              onPress={onPress}
              tile={leader1}
              tileName="leader1"
            />
          }
          leader2={
            <TileM
              breakpoint={breakpoint}
              onPress={onPress}
              tile={leader2}
              tileName="leader2"
            />
          }
          leader3={
            <TileM
              breakpoint={breakpoint}
              onPress={onPress}
              tile={leader3}
              tileName="leader3"
            />
          }
        />
      </View>
    );
  }

  renderHuge(breakpoint) {
    const {
      onPress,
      slice: { leader1, leader2, leader3 }
    } = this.props;
    const styles = styleFactory(breakpoint);

    return (
      <View style={styles.container}>
        {renderHead(styles, breakpoint)}
        <Leaders
          breakpoint={breakpoint}
          leader1={
            <TileAG
              breakpoint={breakpoint}
              onPress={onPress}
              tile={leader1}
              tileName="leader1"
            />
          }
          leader2={
            <TileAG
              breakpoint={breakpoint}
              onPress={onPress}
              tile={leader2}
              tileName="leader2"
            />
          }
          leader3={
            <TileAG
              breakpoint={breakpoint}
              onPress={onPress}
              tile={leader3}
              tileName="leader3"
            />
          }
        />
      </View>
    );
  }

  render() {
    return (
      <ResponsiveSlice
        renderHuge={this.renderHuge}
        renderMedium={this.renderSmall}
        renderSmall={this.renderSmall}
        renderWide={this.renderHuge}
      />
    );
  }
}

LeadersSlice.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    leader1: PropTypes.shape({}).isRequired,
    leader2: PropTypes.shape({}).isRequired,
    leader3: PropTypes.shape({}).isRequired
  }).isRequired
};

export default LeadersSlice;
