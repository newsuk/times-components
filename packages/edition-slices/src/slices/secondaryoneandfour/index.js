import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { TheTimesLogo } from "@times-components/icons";
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
  <View style={styles.sliceWrapper}>
    <View style={styles.logoContainer}>
      <TheTimesLogo height={40} width={40} />
    </View>
    <ItemRowSeparator style={styles.separator} />
    <SecondaryOneAndFourSlice
      renderSecondary={() => <TileN onPress={onPress} tile={secondary} />}
      renderSupport1={() => <TileO onPress={onPress} tile={support1} />}
      renderSupport2={() => <TileO onPress={onPress} tile={support2} />}
      renderSupport3={() => <TileO onPress={onPress} tile={support3} />}
      renderSupport4={() => <TileO onPress={onPress} tile={support4} />}
    />
  </View>
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
