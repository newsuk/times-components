import PropTypes from "prop-types";

const articleHeaderPropTypes = {
  bylines: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  flags: PropTypes.arrayOf(
    PropTypes.shape({
      expiryTime: PropTypes.string,
      type: PropTypes.string
    })
  ),
  hasVideo: PropTypes.bool,
  headline: PropTypes.string.isRequired,
  label: PropTypes.string,
  longRead: PropTypes.bool,
  publicationName: PropTypes.string.isRequired,
  publishedTime: PropTypes.string.isRequired,
  standfirst: PropTypes.string
};

const articleHeaderDefaultProps = {
  flags: [],
  hasVideo: false,
  label: null,
  longRead: false,
  standfirst: null
};

export { articleHeaderPropTypes, articleHeaderDefaultProps };
