import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

import styles from "./styles";

const Group = ({ caption, captionRole, style, children, ...props }) => (
  <View {...props} style={[styles.group, style]}>
    <Text style={styles.text} aria-label={captionRole}>
      {caption}
    </Text>
    <View style={styles.groupElements}>{children}</View>
  </View>
);

Group.propTypes = {
  caption: PropTypes.string.isRequired,
  captionRole: PropTypes.string,
  ...View.propTypes
};

Group.defaultProps = {
  captionRole: ""
};

export default withResponsiveStyles(Group, {
  base: ({ orientation }) => `
    flex-direction: column-reverse;
    align-items: ${orientation};
  `,
  smallUp: ({ orientation }) => `
    flex-direction: row;
    align-items: center;
    justify-content: ${orientation};
  `
});
