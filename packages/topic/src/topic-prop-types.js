import PropTypes from "prop-types";
import { topicHeadPropTypes } from "./topic-head-prop-types";

export const propTypes = {
  topic: PropTypes.shape({
    name: topicHeadPropTypes.name,
    description: topicHeadPropTypes.description
  }),
  error: PropTypes.object,
  isLoading: PropTypes.bool,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  onArticlePress: PropTypes.func,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  refetch: PropTypes.func,
  slug: PropTypes.string.isRequired
};

export const defaultProps = {
  topic: null,
  error: null,
  isLoading: true,
  page: 1,
  pageSize: 10,
  onArticlePress: () => {},
  onNext: () => {},
  onPrev: () => {},
  refetch: () => {}
};
