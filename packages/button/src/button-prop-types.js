import PropTypes from "prop-types";

export const propTypes = {
  fontSize: PropTypes.number,
  lineHeight: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.shape({}),
  title: PropTypes.string
};

export const defaultProps = {
  fontSize: null,
  lineHeight: null,
  style: null,
  title: "Submit"
};
