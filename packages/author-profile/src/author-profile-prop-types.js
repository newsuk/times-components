import PropTypes from "prop-types";
import AuthorHead from "@times-components/author-head";

export const propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.shape(),
  author: PropTypes.shape({
    name: PropTypes.string,
    jobTitle: PropTypes.string,
    biography: AuthorHead.propTypes.bio,
    image: PropTypes.string,
    twitter: PropTypes.string
  }),
  page: PropTypes.number,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  pageSize: PropTypes.number,
  onTwitterLinkPress: PropTypes.func,
  onArticlePress: PropTypes.func,
  slug: PropTypes.string.isRequired,
  refetch: PropTypes.func
};

export const defaultProps = {
  author: null,
  error: null,
  isLoading: true,
  onArticlePress: () => {},
  onTwitterLinkPress: () => {},
  page: 1,
  onNext: () => {},
  onPrev: () => {},
  pageSize: 10,
  refetch: () => {}
};
