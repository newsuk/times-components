import PropTypes from "prop-types";

export default {
  template: PropTypes.shape({
    domain: PropTypes.string,
    type: PropTypes.string
  }),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};
