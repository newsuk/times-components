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
  page: PropTypes.number,
  pageSize: PropTypes.number,
  onArticlePress: PropTypes.func,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  onTwitterLinkPress: PropTypes.func,
  refetch: PropTypes.func,
  slug: PropTypes.string.isRequired
};

export const defaultProps = {
  author: null,
  error: null,
  isLoading: true,
  page: 1,
  pageSize: 10,
  onArticlePress: () => {},
  onNext: () => {},
  onPrev: () => {},
  onTwitterLinkPress: () => {},
  refetch: () => {}
};
