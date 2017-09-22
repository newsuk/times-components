import PropTypes from "prop-types";

export const articleMetaPropTypes = {
  byline: PropTypes.arrayOf(PropTypes.object),
  publishedTime: PropTypes.string,
  publicationName: PropTypes.string
};

export const articleMetaDefaultPropTypes = {
  byline: [],
  publishedTime: null,
  publicationName: null
};
