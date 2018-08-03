import PropTypes from "prop-types";

export const propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.shape({
    button: PropTypes.object,
    text: PropTypes.object
  }),
  title: PropTypes.string
};

export const defaultProps = {
  style: {},
  title: "Submit"
};
