import PropTypes from "prop-types";

export const topicHeadPropTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  isLoading: PropTypes.bool
};

export const topicHeadDefaultProps = {
  name: "Animals",
  description: "Animals are multicellular eukaryotic organisms.",
  isLoading: true
};
