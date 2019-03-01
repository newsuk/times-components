import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Context from "@times-components/context";
import { TheSTLogo, TheTimesLogo } from "@times-components/icons";
import {
  SecondaryOneAndFourSlice,
  ItemRowSeparator
} from "@times-components/slice-layout";
import { TileO, TileN } from "../../tiles";
import styles from "./styles";

const SecondaryOneAndFour = ({
  onPress,
  slice: { secondary, support1, support2, support3, support4 }
}) => (
  <Context.Consumer>
    {({ publicationName }) => (
      <View style={styles.sliceWrapper}>
        <View style={styles.logoContainer}>
          {publicationName === "TIMES" ? (
            <TheTimesLogo height={40} width={40} />
          ) : (
            <TheSTLogo height={40} width={40} />
          )}
        </View>
        <ItemRowSeparator style={styles.separator} />
        <SecondaryOneAndFourSlice
          renderSecondary={() => (
            <TileN onPress={onPress} tile={secondary} tileName="secondary" />
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
  </Context.Consumer>
);

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
