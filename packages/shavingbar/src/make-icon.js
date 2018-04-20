import React from "react";
import PropTypes from "prop-types";
import { ActivityIndicator } from "react-native";

import { IconStar } from "@times-components/icons";

const { primary } = colours.functional;

const Share = ({ Icon, isSharing, isActive }) =>
  isSharing ? (
    <ActivityIndicator />
  ) : (
    <Icon
      fillColour={isActive ? "#fff" : primary}
      strokeColour={isActive ? primary : "#fff"}
    />
  );

Share.propTypes = {
  isSharing: PropTypes.bool,
  isActive: PropTypes.bool.isRequired,
  Icon: PropTypes.func.isRequired
};

Share.defaultProps = {
  isSharing: false
};

const Save = ({ isSaved, isSaving, isActive }) =>
  isSaving ? (
    <ActivityIndicator />
  ) : (
    <IconStar
      fillColour={isActive || !isSaved ? "white" : primary}
      strokeColour={isActive ? "white" : primary}
    />
  );

Save.propTypes = {
  isSaved: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired
};

export const makeShareIcon = (Icon, isSharing = false) => props => (
  <Share Icon={Icon} isSharing={isSharing} {...props} />
);

export const makeSaveIcon = (isSaved, isSaving) => props => (
  <Save isSaved={isSaved} isSaving={isSaving} {...props} />
);
