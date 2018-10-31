import PropTypes from "prop-types";

const articlePropTypes = {
  adConfig: PropTypes.shape({}),
  analyticsStream: PropTypes.func.isRequired,
  data: PropTypes.shape({}),
  header: PropTypes.func,
  receiveChildList: PropTypes.func
};

const articleDefaultProps = {
  adConfig: {},
  data: null,
  header: () => null,
  receiveChildList: () => {}
};

export { articlePropTypes, articleDefaultProps };
