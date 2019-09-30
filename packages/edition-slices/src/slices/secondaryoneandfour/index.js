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
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              {publicationName === "TIMES" ? (
                <TheTimesLogo height={37} width={35} />
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
                  breakpoint={breakpoint}
                />
              }
              support1={
                <TileO
                  onPress={onPress}
                  tile={support1}
                  tileName="support1"
                  breakpoint={breakpoint}
                />
              }
              support2={
                <TileO
                  onPress={onPress}
                  tile={support2}
                  tileName="support2"
                  breakpoint={breakpoint}
                />
              }
              support3={
                <TileO
                  onPress={onPress}
                  tile={support3}
                  tileName="support3"
                  breakpoint={breakpoint}
                />
              }
              support4={
                <TileO
                  onPress={onPress}
                  tile={support4}
                  tileName="support4"
                  breakpoint={breakpoint}
                />
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
        renderSmall={this.renderSlice}
        renderMedium={this.renderSlice}
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
