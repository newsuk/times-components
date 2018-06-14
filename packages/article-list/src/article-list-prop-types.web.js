import PropTypes from "prop-types";
import Pagination from "@times-components/pagination";
import {
  propTypes as basePropTypes,
  defaultProps
} from "./article-list-prop-types-base";

export const propTypes = {
  adConfig: PropTypes.shape({}).isRequired,
  ...basePropTypes,
  ...Pagination.propTypes
};

export { defaultProps };
