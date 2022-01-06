import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";

const articleFlagPropTypes = {
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      rgba: PropTypes.shape({
        alpha: PropTypes.number,
        blue: PropTypes.number,
        green: PropTypes.number,
        red: PropTypes.number
      })
    })
  ])
};

const articleFlagsPropTypes = {
  flags: PropTypes.arrayOf(
    PropTypes.shape({
      expiryTime: PropTypes.string,
      type: PropTypes.string
    })
  ),
  longRead: PropTypes.bool,
  withContainer: PropTypes.bool
};

const articleFlagDefaultProps = {
  color: colours.functional.primary
};

export { articleFlagPropTypes, articleFlagsPropTypes, articleFlagDefaultProps };
