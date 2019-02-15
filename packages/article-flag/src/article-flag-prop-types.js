import PropTypes from "prop-types";
import { ViewPropTypes } from "react-native";
import { colours } from "@times-components/styleguide";

const { style: ViewStylePropTypes } = ViewPropTypes;

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
  flags: PropTypes.arrayOf(PropTypes.string),
  style: ViewStylePropTypes
};

const articleFlagDefaultProps = {
  color: colours.functional.primary
};

export { articleFlagPropTypes, articleFlagsPropTypes, articleFlagDefaultProps };
