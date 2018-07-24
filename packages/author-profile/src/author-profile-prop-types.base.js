import PropTypes from "prop-types";
import { propTypes as authorProfileHeadPropTypes } from "./author-profile-head-prop-types";

export const propTypes = {
  author: PropTypes.shape({
    biography: authorProfileHeadPropTypes.biography,
    image: authorProfileHeadPropTypes.uri,
    jobTitle: authorProfileHeadPropTypes.jobTitle,
    name: authorProfileHeadPropTypes.name,
    twitter: authorProfileHeadPropTypes.twitter
  }),
  error: PropTypes.object,
  isLoading: authorProfileHeadPropTypes.isLoading,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  refetch: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired
};

export const defaultProps = {
  author: null,
  error: null,
  isLoading: true,
  page: 1,
  pageSize: 10
};
