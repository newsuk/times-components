import PropTypes from "prop-types";
import ArticleHeader from "./article-header/article-header";
import ArticleMeta from "./article-meta/article-meta";

const articlePropTypes = {
  analyticsStream: PropTypes.func.isRequired,
  data: PropTypes.shape({
    ...ArticleHeader.propTypes,
    ...ArticleMeta.propTypes
    // Could have more here
  }),
  observed: PropTypes.object.isRequired,
  registerNode: PropTypes.func.isRequired
};

const articleDefaultProps = {
  data: null
};

export { articlePropTypes, articleDefaultProps };
