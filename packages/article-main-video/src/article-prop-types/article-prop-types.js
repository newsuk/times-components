import PropTypes from "prop-types";
import ArticleMeta from "../article-meta/article-meta-prop-types";

const articlePropTypes = {
  adConfig: PropTypes.shape({}).isRequired,
  analyticsStream: PropTypes.func.isRequired,
  data: PropTypes.shape({
    ...ArticleMeta
  }),
  receiveChildList: PropTypes.func,
  navigationMode: PropTypes.shape({}).isRequired,
  zephrDivs: PropTypes.bool,
  storefrontConfig: PropTypes.string.isRequired
};

const articleDefaultProps = {
  data: null,
  receiveChildList: () => {}
};

export { articlePropTypes, articleDefaultProps };
