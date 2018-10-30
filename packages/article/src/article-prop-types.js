import PropTypes from "prop-types";

const articlePropTypes = {
  analyticsStream: PropTypes.func.isRequired,
  data: PropTypes.shape({}),
  header: PropTypes.func
};

const articleDefaultProps = {
  data: null
};

export { articlePropTypes, articleDefaultProps };
