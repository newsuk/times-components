import React from "react";
import { Text } from "react-native";
import format from "date-fns/format";
import PropTypes from "prop-types";
import styled from "styled-components";

const { style: TextPropTypesStyle } = Text.propTypes;

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

const DatePublication = ({ date, publication, style, WrapperComponent }) => (
  <WrapperComponent
    accessibilityLabel="datePublication"
    testID="datePublication"
    style={[styles.default, style]}
  >
    {format(date, "dddd MMMM DD YYYY")}
    {publications[publication] ? `, ${publications[publication]}` : ""}
  </WrapperComponent>
);

DatePublication.propTypes = {
  date: PropTypes.instanceOf(Date),
  publication: PropTypes.oneOf(Object.keys(publications)),
  style: TextPropTypesStyle,
  WrapperComponent: (props, propName) => {
    const styledCheck = styled(Text) ``;
    if (props[propName] !== Text && props[propName].target !== styledCheck.target) {
      return new Error('Not a text');
    }
    return null;
  }
};



DatePublication.defaultProps = {
  date: null,
  style: {},
  publication: "TIMES",
  WrapperComponent: Text
};

export default DatePublication;
