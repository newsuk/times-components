import React from "react";
import { Text } from "react-native";
import format from "date-fns/format";
import PropTypes from "prop-types";

const styles = {
  meta: {
    color: "#696969",
    fontSize: 13,
    fontFamily: "GillSansMTStd-Medium"
  }
};

const ArticleMeta = ({ date, publication, style }) => {
  const DATE_FORMAT = "dddd MMMM DD YYYY";

  if (!date || !publication) {
    return null;
  }

  return (
    <Text style={[styles.meta, style]}>
      {format(date, DATE_FORMAT)}, {publication}
    </Text>
  );
};

ArticleMeta.propTypes = {
  date: PropTypes.string,
  publication: PropTypes.string,
  style: Text.propTypes.style
};

ArticleMeta.defaultProps = {
  date: null,
  publication: "",
  style: {}
};

export default ArticleMeta;
