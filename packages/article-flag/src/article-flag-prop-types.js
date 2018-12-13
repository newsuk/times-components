import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";

const articleFlagPropTypes = {
  color: PropTypes.string
};

const articleFlagDefaultProps = {
  color: colours.functional.white
};

export { articleFlagPropTypes, articleFlagDefaultProps };
