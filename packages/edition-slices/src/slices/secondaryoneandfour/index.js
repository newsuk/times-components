import React from "react";
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

const SecondaryOneAndFour = ({
  onPress,
  slice: { secondary, support1, support2, support3, support4 }
}) => {
  const renderSlice = breakpoint => {
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
              renderSecondary={() => (
                <TileN
                  onPress={onPress}
                  tile={secondary}
                  tileName="secondary"
                />
              )}
              renderSupport1={() => (
                <TileO onPress={onPress} tile={support1} tileName="support1" />
              )}
              renderSupport2={() => (
                <TileO onPress={onPress} tile={support2} tileName="support2" />
              )}
              renderSupport3={() => (
                <TileO onPress={onPress} tile={support3} tileName="support3" />
              )}
              renderSupport4={() => (
                <TileO onPress={onPress} tile={support4} tileName="support4" />
              )}
            />
          </View>
        )}
      </SectionContext.Consumer>
    );
  };

  return (
    <ResponsiveSlice renderMedium={renderSlice} renderSmall={renderSlice} />
  );
};

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
