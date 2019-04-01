import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { SectionContext } from "@times-components/context";
import { TheSTLogo, TheTimesLogo } from "@times-components/icons";
import {
  SecondaryOneAndFourSlice,
  ItemRowSeparator
} from "@times-components/slice-layout";
import { TileO, TileN } from "../../tiles";
import styleFactory from "./styles";
import { ResponsiveSlice } from "../shared";

class SecondaryOneAndFour extends Component {
  constructor(props) {
    super(props);
    this.renderSlice = this.renderSlice.bind(this);
  }

  renderSlice(breakpoint) {
    const {
      onPress,
      slice: { secondary, support1, support2, support3, support4 }
    } = this.props;

    const styles = styleFactory(breakpoint);
    return (
      <SectionContext.Consumer>
        {({ publicationName }) => (
          <View style={styles.sliceWrapper}>
            <View style={styles.logoContainer}>
              {publicationName === "TIMES" ? (
                <TheTimesLogo height={40} width={42} />
              ) : (
                <TheSTLogo height={40} width={60} />
              )}
            </View>
            <ItemRowSeparator style={styles.separator} />
            <SecondaryOneAndFourSlice
              breakpoint={breakpoint}
              secondary={
                <TileN
                  onPress={onPress}
                  tile={secondary}
                  tileName="secondary"
                />
              }
              support1={
                <TileO onPress={onPress} tile={support1} tileName="support1" />
              }
              support2={
                <TileO onPress={onPress} tile={support2} tileName="support2" />
              }
              support3={
                <TileO onPress={onPress} tile={support3} tileName="support3" />
              }
              support4={
                <TileO onPress={onPress} tile={support4} tileName="support4" />
              }
            />
          </View>
        )}
      </SectionContext.Consumer>
    );
  }

  render() {
    return (
      <ResponsiveSlice
        renderMedium={this.renderSlice}
        renderSmall={this.renderSlice}
      />
    );
  }
}

SecondaryOneAndFour.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    secondary: PropTypes.shape({}).isRequired,
    support1: PropTypes.shape({}).isRequired,
    support2: PropTypes.shape({}).isRequired,
    support3: PropTypes.shape({}).isRequired,
    support4: PropTypes.shape({}).isRequired
  }).isRequired
};

export default SecondaryOneAndFour;
