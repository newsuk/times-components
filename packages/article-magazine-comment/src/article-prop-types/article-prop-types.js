import PropTypes from "prop-types";
import {
  articlePagePropTypes,
  articlePageDefaultProps
} from "./article-prop-types.base";

const articlePropTypes = {
  ...articlePagePropTypes,
  commentingConfig: PropTypes.shape({
    account: PropTypes.string.isRequired
  }).isRequired,
  navigationMode: PropTypes.shape({}).isRequired
};

const articleDefaultProps = {
  ...articlePageDefaultProps
};

export { articlePropTypes, articleDefaultProps };
