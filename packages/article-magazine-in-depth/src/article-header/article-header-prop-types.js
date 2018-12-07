import PropTypes from "prop-types";

const articleHeaderPropTypes = {
  flags: PropTypes.arrayOf(PropTypes.string),
  headline: PropTypes.string.isRequired,
  label: PropTypes.string,
  standfirst: PropTypes.string
};

const articleHeaderDefaultProps = {
  flags: null,
  label: null,
  standfirst: null
};

export { articleHeaderPropTypes, articleHeaderDefaultProps };
