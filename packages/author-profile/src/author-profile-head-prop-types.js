import PropTypes from "prop-types";
import { treePropType } from "@times-components/markup";

export const propTypes = {
  biography: PropTypes.arrayOf(treePropType),
  isLoading: PropTypes.bool,
  jobTitle: PropTypes.string,
  name: PropTypes.string,
  onTwitterLinkPress: PropTypes.func,
  twitter: PropTypes.string,
  uri: PropTypes.string
};

export const defaultProps = {
  biography: [],
  isLoading: true,
  jobTitle: "",
  name: "",
  onTwitterLinkPress: () => {},
  twitter: "",
  uri: ""
};
