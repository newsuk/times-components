import PropTypes from "prop-types";

const propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string
  }).isRequired
};

export default propTypes;
