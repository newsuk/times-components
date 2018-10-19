import PropTypes from "prop-types";

const articlePropTypes = {
  analyticsStream: PropTypes.func.isRequired,
  data: PropTypes.shape({}),
  observed: PropTypes.object.isRequired,
  registerNode: PropTypes.func.isRequired
};

const articleDefaultProps = {
  data: null
};

export { articlePropTypes, articleDefaultProps };
