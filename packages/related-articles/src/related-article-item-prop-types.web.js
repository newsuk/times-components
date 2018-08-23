import PropTypes from "prop-types";

import {
  sharedPropTypes,
  sharedDefaultProps
} from "./related-article-item-prop-types-base";

export const relatedArticleItemPropTypes = {
  ...sharedPropTypes,
  bylineClass: PropTypes.string,
  contentContainerClass: PropTypes.string,
  headlineClass: PropTypes.string,
  imageContainerClass: PropTypes.string
};

export const relatedArticleItemDefaultProps = {
  ...sharedDefaultProps,
  bylineClass: "",
  contentContainerClass: "",
  headlineClass: "",
  imageContainerClass: ""
};
