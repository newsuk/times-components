import PropTypes from "prop-types";
import { treePropType } from "@times-components/markup";

export const propTypes = {
  biography: PropTypes.arrayOf(treePropType),
  isLoading: PropTypes.bool,
  name: PropTypes.string,
  onTwitterLinkPress: PropTypes.func,
  title: PropTypes.string,
  twitter: PropTypes.string,
  uri: PropTypes.string
};

export const defaultProps = {
  biography: [],
  isLoading: false,
  name: "",
  onTwitterLinkPress: () => {},
  title: "",
  twitter: null,
  uri: ""
};
