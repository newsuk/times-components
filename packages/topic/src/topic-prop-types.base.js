import PropTypes from "prop-types";
import { propTypes as topicHeadPropTypes } from "./topic-head-prop-types";

export const propTypes = {
  error: PropTypes.object,
  isLoading: topicHeadPropTypes.isLoading,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  refetch: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
  topic: PropTypes.shape({
    name: topicHeadPropTypes.name,
    description: topicHeadPropTypes.description
  })
};

export const defaultProps = {
  error: null,
  isLoading: true,
  page: 1,
  pageSize: 10,
  topic: null
};
