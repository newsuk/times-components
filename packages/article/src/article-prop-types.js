import PropTypes from "prop-types";

const articlePropTypes = {
  analyticsStream: PropTypes.func.isRequired,
  data: PropTypes.shape({}),
  header: PropTypes.func,
  receiveChildList: PropTypes.func
};

const articleDefaultProps = {
  data: null,
  header: () => null,
  receiveChildList: () => {}
};

export { articlePropTypes, articleDefaultProps };
