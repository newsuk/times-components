import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";

import { spacing } from "@times-components/styleguide";
import withResponsiveStyles from "@times-components/responsive-styles";
import { IconTwitter, IconFacebook, IconEmail } from "@times-components/icons";

import Bubble from "./bubble";
import styles from "./styles";
import Bar from "./bar";
import Group from "./group";
import { makeShareIcon, makeSaveIcon } from "./make-icon";


function Shavingbar({
  isSaved,
  isSaving,
  isSharing,
  onEmail,
  onTwitter,
  onFacebook,
  onSave,
  ...props
}) {
  return (
    <Bar {...props}>
      <Group 
        caption="Share" 
        orientation="flex-start">
        <Bubble
          isLoading={isSharing}
          onPress={onEmail}
          render={makeShareIcon(IconEmail, "share via email", isSharing)}/>
        <Bubble
          onPress={onTwitter}
          style={{marginLeft: spacing(2), marginRight: spacing(2)}}
          render={makeShareIcon(IconTwitter, "share via Twitter")}/>
        <Bubble
          onPress={onFacebook}
          render={makeShareIcon(IconFacebook, "share via Facebook")}/>
        </Group>
      <Group 
        caption={isSaved ? "Saved" : "Save"} 
        role="Save Status" 
        orientation="flex-end">
        <Bubble
          isLoading={isSaving}
          onPress={onSave}
          render={makeSaveIcon(isSaved, isSaving)}
        />
      </Group>
    </Bar>
  );
}

Shavingbar.propTypes = {
  isSaved: PropTypes.bool,
  isSaving: PropTypes.bool,
  isSharing: PropTypes.bool,
  onEmail: PropTypes.func,
  onTwitter: PropTypes.func,
  onFacebook: PropTypes.func,
  onSave: PropTypes.func
};

const noop = () => {};
Shavingbar.defaultProps = {
  isSaved: false,
  isSaving: false,
  isSharing: false,
  onEmail: noop,
  onTwitter: noop,
  onFacebook: noop,
  onSave: noop
};

export default withResponsiveStyles(Shavingbar, {
  base: () => `padding-bottom: ${spacing(0)};`,
  smallUp: () => `padding-bottom: ${spacing(1)}`
});

