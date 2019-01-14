import PropTypes from "prop-types";

const articleHeaderPropTypes = {
  byline: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  flags: PropTypes.arrayOf(PropTypes.string),
  hasVideo: PropTypes.bool,
  headline: PropTypes.string.isRequired,
  label: PropTypes.string,
  publicationName: PropTypes.string.isRequired,
  publishedTime: PropTypes.string.isRequired,
  standfirst: PropTypes.string
};

const articleHeaderDefaultProps = {
  flags: null,
  hasVideo: false,
  label: null,
  standfirst: null
};

export { articleHeaderPropTypes, articleHeaderDefaultProps };
