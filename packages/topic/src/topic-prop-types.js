import { propTypes as topicHeadPropTypes } from "./topic-head-prop-types";

export const propTypes = {
  name: topicHeadPropTypes.name,
  description: topicHeadPropTypes.description,
  isLoading: topicHeadPropTypes.isLoading
};

export const defaultProps = {
  name: "",
  description: "",
  isLoading: false
};
