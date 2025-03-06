import PropTypes from "prop-types";

export const propTypes = {
  fontSize: PropTypes.number,
  lineHeight: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  title: PropTypes.string,
  textStyle: PropTypes.string,
  underlayColor: PropTypes.string
};

export const defaultProps = {
  fontSize: null,
  lineHeight: null,
  style: null,
  textStyle: null,
  title: "Submit",
  underlayColor: null
};
