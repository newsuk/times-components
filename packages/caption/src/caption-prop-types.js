import PropTypes from "prop-types";

export const propTypes = {
  children: PropTypes.element,
  credits: PropTypes.string,
  style: PropTypes.shape({
    container: PropTypes.shape({}),
    text: PropTypes.shape({})
  }),
  text: PropTypes.string
};

export const defaultProps = {
  children: null,
  credits: "",
  style: {},
  text: ""
};
