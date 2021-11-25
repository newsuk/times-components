import PropTypes from "prop-types";

const articleSkeletonPropTypes = {
  adConfig: PropTypes.shape({}),
  analyticsStream: PropTypes.func.isRequired,
  data: PropTypes.shape({}),
  Header: PropTypes.func.isRequired,
  navigationMode: PropTypes.shape({}),
  receiveChildList: PropTypes.func,
  commentingConfig: PropTypes.shape({
    accounts: PropTypes.shape({
      current: PropTypes.string.isRequired,
      readOnly: PropTypes.string.isRequired
    }),
    switchOver: PropTypes.string.isRequired
  }).isRequired,
  swgProductId: PropTypes.string
};

const articleSkeletonDefaultProps = {
  adConfig: {},
  data: { content: [] },
  Header: () => null,
  receiveChildList: () => {},
  swgProductId: null
};

export { articleSkeletonPropTypes, articleSkeletonDefaultProps };
