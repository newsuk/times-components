import React from "react";
import { Text } from "react-native";
import format from "date-fns/format";
import PropTypes from "prop-types";

const styles = {
  default: {
    color: "#696969",
    fontSize: 13,
    fontFamily: "GillSansMTStd-Medium"
  }
};

const publications = {
  SUNDAYTIMES: "The Sunday Times",
  TIMES: "The Times"
};

const DatePublication = ({ date, publication, style }) => (
  <Text style={[styles.default, style]}>
    {format(date, "dddd MMMM DD YYYY")}
    {publications[publication] ? `, ${publications[publication]}` : ""}
  </Text>
);

DatePublication.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  publication: PropTypes.oneOf(Object.keys(publications)).isRequired,
  style: Text.propTypes.style
};

DatePublication.defaultProps = {
  date: null,
  publication: "",
  style: {}
};

export default DatePublication;
