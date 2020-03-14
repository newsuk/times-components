import PropTypes from "prop-types";


export const topicsPropTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.shape({}),
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string
    }).isRequired
  ).isRequired
};

export const topicsDefaultProps = {
  style: null
};
