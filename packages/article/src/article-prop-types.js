import PropTypes from "prop-types";

const articlePropTypes = {
  adConfig: PropTypes.shape({}),
  analyticsStream: PropTypes.func.isRequired,
  data: PropTypes.shape({}),
  Header: PropTypes.func,
  receiveChildList: PropTypes.func
};

const articleDefaultProps = {
  adConfig: {},
  data: null,
  Header: () => null,
  receiveChildList: () => {}
};

export { articlePropTypes, articleDefaultProps };
