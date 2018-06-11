import Pagination from "@times-components/pagination";
import {
  propTypes as basePropTypes,
  defaultProps
} from "./article-list-prop-types-base";

export const propTypes = {
  ...basePropTypes,
  ...Pagination.propTypes
};

export { defaultProps };
