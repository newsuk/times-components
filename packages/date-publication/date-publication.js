import React from "react";
import { Text } from "react-native";
import format from "date-fns/format";
import PropTypes from "prop-types";
import StylePropTypes from "react-style-proptype";

const styles = {
  default: {
    color: "#696969",
    fontSize: 13,
    lineHeight: 15,
    fontFamily: "GillSansMTStd-Medium"
  }
};

const publications = {
  SUNDAYTIMES: "The Sunday Times",
  TIMES: "The Times"
};

const DatePublication = ({ date, publication, style }) => (
  <Text
    accessibilityLabel="datePublication"
    testID="datePublication"
    style={[styles.default, style]}
  >
    {format(date, "dddd MMMM DD YYYY")}
    {publications[publication] ? `, ${publications[publication]}` : ""}
  </Text>
);

DatePublication.propTypes = {
  date: PropTypes.instanceOf(Date),
  publication: PropTypes.oneOf(Object.keys(publications)).isRequired,
  style: StylePropTypes
};

DatePublication.defaultProps = {
  date: null,
  style: {}
};

export default DatePublication;
