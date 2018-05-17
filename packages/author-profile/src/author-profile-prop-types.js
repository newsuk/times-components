import PropTypes from "prop-types";
import AuthorHead from "@times-components/author-head";

export const propTypes = {
  author: PropTypes.shape({
    biography: AuthorHead.propTypes.bio,
    image: PropTypes.string,
    jobTitle: PropTypes.string,
    name: PropTypes.string,
    twitter: PropTypes.string
  }),
  error: PropTypes.object,
  isLoading: PropTypes.bool,
  onArticlePress: PropTypes.func,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  onTwitterLinkPress: PropTypes.func,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  refetch: PropTypes.func,
  slug: PropTypes.string.isRequired
};

export const defaultProps = {
  author: null,
  error: null,
  isLoading: true,
  onArticlePress: () => {},
  onNext: () => {},
  onPrev: () => {},
  onTwitterLinkPress: () => {},
  page: 1,
  pageSize: 10,
  refetch: () => {}
};
