import PropTypes from "prop-types";

export const propTypes = {
  baseUrl: PropTypes.string,
  contextUrl: PropTypes.string,
  isLoading: PropTypes.bool,
  section: PropTypes.string,
  slotName: PropTypes.string.isRequired,
  style: PropTypes.shape({})
};

export const defaultProps = {
  baseUrl: "https://www.thetimes.co.uk/",
  contextUrl: "",
  isLoading: false,
  section: "",
  style: null
};
