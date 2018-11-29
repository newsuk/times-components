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

const flagsMapping = new Map([
  ["NEW", <NewArticleFlag />],
  ["UPDATED", <UpdatedArticleFlag />],
  ["EXCLUSIVE", <ExclusiveArticleFlag />],
  ["SPONSORED", <SponsoredArticleFlag />]
]);

const HeaderFlags = ({ flags }) => {
  if (!flags || flags.length === 0) return null;
  return (
    <View style={styles.flag}>
      {flags.map(flag => (
        <View key={flag} style={styles.flagContainer}>
          {flagsMapping.get(flag)}
        </View>
      ))}
    </View>
  );
};

HeaderFlags.propTypes = {
  flags: PropTypes.arrayOf(PropTypes.oneOf(Array.from(flagsMapping.keys())))
};

HeaderFlags.defaultProps = {
  flags: []
};

export default HeaderFlags;
