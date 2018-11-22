import PropTypes from "prop-types";

const articleSkeletonPropTypes = {
  adConfig: PropTypes.shape({}),
  analyticsStream: PropTypes.func.isRequired,
  data: PropTypes.shape({}),
  Header: PropTypes.func,
  receiveChildList: PropTypes.func
};

const articleSkeletonDefaultProps = {
  adConfig: {},
  data: null,
  Header: () => null,
  receiveChildList: () => {}
};

export { articleSkeletonPropTypes, articleSkeletonDefaultProps };
