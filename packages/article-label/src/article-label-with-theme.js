import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import Context from "@times-components/context";
import { colours } from "@times-components/styleguide";

import ArticleLabel from "./article-label";

const LabelWithTheme = ({ label, LabelComponent, ...props }) =>
  label ? (
    <Context.Consumer>
      {({ theme: { sectionColour } }) => (
        <View {...props}>
          <LabelComponent
            color={sectionColour || colours.section.default}
            title={label}
          />
        </View>
      )}
    </Context.Consumer>
  ) : null;

LabelWithTheme.propTypes = {
  label: PropTypes.string,
  LabelComponent: PropTypes.func
};

LabelWithTheme.defaultProps = {
  label: null,
  LabelComponent: ArticleLabel
};

export default LabelWithTheme;
