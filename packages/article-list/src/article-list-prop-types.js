import PropTypes from "prop-types";
import {
  propTypes as basePropTypes,
  defaultProps
} from "./article-list-prop-types-base";

export const propTypes = {
  ...basePropTypes,
  count: PropTypes.number,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  page: PropTypes.number,
  pageSize: PropTypes.number
};

export { defaultProps };
