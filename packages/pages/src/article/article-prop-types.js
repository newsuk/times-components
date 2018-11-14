import PropTypes from "prop-types";

export const propTypes = {
  article: PropTypes.shape({}),
  error: PropTypes.shape({}),
  isLoading: PropTypes.bool,
  omitErrors: PropTypes.bool,
  referralUrl: PropTypes.string,
  refetch: PropTypes.func,
  scale: PropTypes.string,
  sectionName: PropTypes.string,
  showInteractives: PropTypes.bool
};

export const defaultProps = {
  article: null,
  error: null,
  isLoading: false,
  omitErrors: false,
  referralUrl: null,
  refetch: () => {},
  scale: null,
  sectionName: null,
  showInteractives: false
};
