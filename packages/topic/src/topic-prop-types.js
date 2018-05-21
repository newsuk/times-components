import PropTypes from "prop-types";
import { propTypes as topicHeadPropTypes } from "./topic-head-prop-types";

export const propTypes = {
  topic: PropTypes.shape({
    name: topicHeadPropTypes.name,
    description: topicHeadPropTypes.description
  }),
  error: PropTypes.object,
  isLoading: topicHeadPropTypes.isLoading,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  onArticlePress: PropTypes.func,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  refetch: PropTypes.func,
  slug: PropTypes.string.isRequired
};

export const defaultProps = {
  name: "",
  description: "",
  isLoading: false
};
