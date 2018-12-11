import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";

const articleFlagTypesPropTypes = {
  color: PropTypes.string
};

const articleFlagTypesDefaultProps = {
  color: colours.functional.white
};

export { articleFlagTypesPropTypes, articleFlagTypesDefaultProps };
