import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import {
  NewArticleFlag,
  SponsoredArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag
} from "@times-components/article-flag";
import styles from "../styles";

const flagsMapping = color =>
  new Map([
    ["NEW", <NewArticleFlag color={color} />],
    ["UPDATED", <UpdatedArticleFlag color={color} />],
    ["EXCLUSIVE", <ExclusiveArticleFlag color={color} />],
    ["SPONSORED", <SponsoredArticleFlag color={color} />]
  ]);

const HeaderFlags = ({ flags, color }) => {
  if (!flags || flags.length === 0) return null;
  return (
    <View style={styles.flag}>
      {flags.map(flag => (
        <View key={flag} style={styles.flagContainer}>
          {flagsMapping(color).get(flag)}
        </View>
      ))}
    </View>
  );
};

HeaderFlags.propTypes = {
  color: PropTypes.string,
  flags: PropTypes.arrayOf(PropTypes.oneOf(Array.from(flagsMapping().keys())))
};

HeaderFlags.defaultProps = {
  color: "#1D1D1B",
  flags: []
};

export default HeaderFlags;
