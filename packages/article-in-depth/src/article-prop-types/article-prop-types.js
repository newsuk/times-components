import PropTypes from "prop-types";
import {
  articlePagePropTypes,
  articlePageDefaultProps
} from "./article-prop-types.base";

const articlePropTypes = {
  ...articlePagePropTypes,
  navigationMode: PropTypes.shape({}).isRequired
};

const articleDefaultProps = {
  ...articlePageDefaultProps
};

export { articlePropTypes, articleDefaultProps };
