import PropTypes from "prop-types";

const propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired
};

export default propTypes;
