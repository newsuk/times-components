import PropTypes from "prop-types";
import ArticleHeader from "../article-header/article-header";

const articlePropTypesBase = {
  adConfig: PropTypes.shape({}).isRequired,
  analyticsStream: PropTypes.func.isRequired,
  data: PropTypes.shape({
    ...ArticleHeader.propTypes,
    // Could have more here
  }),
  receiveChildList: PropTypes.func
};

const articleDefaultPropsBase = {
  data: null,
  receiveChildList: () => {}
};

export { articlePropTypesBase, articleDefaultPropsBase };
