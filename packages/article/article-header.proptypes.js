import PropTypes from "prop-types";

export const articleHeaderPropTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string,
  standfirst: PropTypes.string,
  flags: PropTypes.arrayOf(PropTypes.string)
};

export const articleHeaderDefaultPropTypes = {
  label: null,
  standfirst: null,
  flags: []
};
