import PropTypes from "prop-types";
import {
  sharedPropTypes,
  sharedDefaultProps
} from "./related-article-item-prop-types-base";

const relatedArticleItemPropTypes = {
  ...sharedPropTypes,
  onPress: PropTypes.func.isRequired
};

export {
  relatedArticleItemPropTypes,
  sharedDefaultProps as relatedArticleItemDefaultProps
};
