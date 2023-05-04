import PropTypes from "prop-types";
import ArticleHeader from "../article-header/article-header";
import ArticleMeta from "../article-meta/article-meta";

const articlePropTypes = {
  adConfig: PropTypes.shape({}).isRequired,
  analyticsStream: PropTypes.func.isRequired,
  data: PropTypes.shape({
    ...ArticleHeader.propTypes,
    ...ArticleMeta.propTypes
    // Could have more here
  }),
  receiveChildList: PropTypes.func,
  navigationMode: PropTypes.shape({}).isRequired,
  zephrDivs: PropTypes.bool
};

const articleDefaultProps = {
  data: null,
  receiveChildList: () => {}
};

export { articlePropTypes, articleDefaultProps };
