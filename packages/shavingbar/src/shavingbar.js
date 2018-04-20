import React from "react";
import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";
import { View, Text } from "react-native";

import { IconTwitter, IconFacebook, IconEmail } from "@times-components/icons";

import Bubble from "./bubble";
import styles from "./styles";
import { makeShareIcon, makeSaveIcon } from "./make-icon";

export default function Shavingbar({
  isSaved = false,
  isSaving = false,
  isSharing = false,
  onEmail = () => {},
  onTwitter = () => {},
  onFacebook = () => {},
  onSave = () => {}
}) {
  return (
    <View style={styles.body}>
      <View style={styles.group}>
        <Text style={styles.text}>Share</Text>
        <Bubble
          isLoading={isSharing}
          onPress={onEmail}
          render={makeShareIcon(IconEmail, isSharing)}
        />
        <Bubble onPress={onTwitter} render={makeShareIcon(IconTwitter)} />
        <Bubble onPress={onFacebook} render={makeShareIcon(IconFacebook)} />
      </View>
      <View style={styles.group}>
        <Text style={styles.text}>{isSaved ? "Saved" : "Save"}</Text>
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

Shavingbar.defaultProps = {
  isSaved: false,
  isSaving: false,
  isSharing: false,
  onEmail: () => {},
  onTwitter: () => {},
  onFacebook: () => {},
  onSave: () => {}
};
