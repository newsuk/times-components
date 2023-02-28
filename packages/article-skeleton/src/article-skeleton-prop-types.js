import PropTypes from "prop-types";

const articleSkeletonPropTypes = {
  adConfig: PropTypes.shape({}),
  analyticsStream: PropTypes.func.isRequired,
  data: PropTypes.shape({}),
  Header: PropTypes.func.isRequired,
  navigationMode: PropTypes.shape({}),
  receiveChildList: PropTypes.func,
  commentingConfig: PropTypes.shape({
    account: PropTypes.string.isRequired
  }).isRequired,
  swgProductId: PropTypes.string,
  zephrDivs: PropTypes.bool
};

const articleSkeletonDefaultProps = {
  adConfig: {},
  data: { content: [] },
  Header: () => null,
  receiveChildList: () => {},
  swgProductId: null,
  zephrDivs: false
};

export { articleSkeletonPropTypes, articleSkeletonDefaultProps };
