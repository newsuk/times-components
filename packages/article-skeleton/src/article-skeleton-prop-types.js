import PropTypes from "prop-types";

const articleSkeletonPropTypes = {
  adConfig: PropTypes.shape({}),
  analyticsStream: PropTypes.func.isRequired,
  data: PropTypes.shape({}),
  Header: PropTypes.func.isRequired,
  navigationMode: PropTypes.shape({}),
  receiveChildList: PropTypes.func,
  spotAccountId: PropTypes.string
};

const articleSkeletonDefaultProps = {
  adConfig: {},
  data: null,
  Header: () => null,
  receiveChildList: () => {}
};

export { articleSkeletonPropTypes, articleSkeletonDefaultProps };
