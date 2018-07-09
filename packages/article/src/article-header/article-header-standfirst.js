import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import styles from "../styles/article-header";

const HeaderStandfirst = ({ standfirst }) => {
  if (!standfirst) return null;
  return (
    <Text style={[styles.standFirst]} testID="standfirst">
      {standfirst}
    </Text>
  );
};

HeaderStandfirst.propTypes = {
  standfirst: PropTypes.string
};

HeaderStandfirst.defaultProps = {
  standfirst: null
};

export default HeaderStandfirst;
