import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";

const styles = {
  meta: {
    color: "#696969",
    fontSize: 13,
    fontFamily: "GillSansMTStd-Medium"
  }
};

export default function ArticleByline({ author, style }) {
  let byline;
  if (!author) {
    return null;
  }

  if (Array.isArray(author)) {
    const numOfAuthors = author.length;
    byline = author
      .map(
        (_author, i) =>
          `${_author.name}, ${_author.location} ${i === numOfAuthors - 1
            ? ""
            : " | "}`
      )
      .join("");
  } else {
    byline = `${author.name}, ${author.location}`;
  }

  return (
    <Text style={[styles.meta, style]}>
      {byline}
    </Text>
  );
}
const authorProptype = PropTypes.shape({
  name: PropTypes.string,
  location: PropTypes.string
});

ArticleByline.propTypes = {
  author: PropTypes.oneOfType([
    PropTypes.arrayOf(authorProptype),
    authorProptype
  ]),
  style: Text.propTypes.style
};

ArticleByline.defaultProps = {
  author: {},
  style: {}
};
