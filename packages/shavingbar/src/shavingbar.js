import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";

import { IconTwitter, IconFacebook, IconEmail } from "@times-components/icons";

import Bubble from "./bubble";
import styles from "./styles";
import { makeShareIcon, makeSaveIcon } from "./make-icon";

export default function Shavingbar({
  isSaved,
  isSaving,
  isSharing,
  onEmail,
  onTwitter,
  onFacebook,
  onSave
}) {
  return (
    <View style={styles.body}>
      <View style={styles.group}>
        <Text style={styles.text}>Share</Text>
        <Bubble
          isLoading={isSharing}
          onPress={onEmail}
          render={makeShareIcon(IconEmail, "share via email", isSharing)}
        />
        <Bubble
          onPress={onTwitter}
          render={makeShareIcon(IconTwitter, "share via twiter")}
        />
        <Bubble
          onPress={onFacebook}
          render={makeShareIcon(IconFacebook, "share via facebook")}
        />
      </View>
      <View style={styles.group}>
        <Text aria-label="Save Status" style={styles.text}>
          {isSaved ? "Saved" : "Save"}
        </Text>
        <Bubble
          isLoading={isSaving}
          onPress={onSave}
          render={makeSaveIcon(isSaved, isSaving)}
        />
      </View>
    </View>
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
