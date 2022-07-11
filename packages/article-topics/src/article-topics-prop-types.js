import PropTypes from "prop-types";

export const topicsPropTypes = {
  onPress: PropTypes.func,
  style: PropTypes.object,
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export const topicsDefaultProps = {
  style: null
};
