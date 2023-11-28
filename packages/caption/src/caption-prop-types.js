import PropTypes from "prop-types";

const { style: TextPropTypesStyle } = PropTypes.string;
const { style: ViewPropTypesStyle } = PropTypes.object;

export const propTypes = {
  children: PropTypes.element,
  credits: PropTypes.string,
  style: PropTypes.shape({
    container: ViewPropTypesStyle,
    text: TextPropTypesStyle
  }),
  text: PropTypes.string
};

export const defaultProps = {
  children: null,
  credits: "",
  style: {},
  text: ""
};
