import React from "react";
import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";
import {
  View,
  Text,
  ActivityIndicator
} from "react-native";

import {
  IconTwitter,
  IconFacebook,
  IconEmail,
  IconStar
} from "@times-components/icons";

import Bubble from "./bubble";
import styles from "./styles";

const { primary } = colours.functional;

const Share = ({Icon, isSharing, isActive}) => (
  isSharing 
    ? <ActivityIndicator />
    : <Icon
        fillColour = {isActive ? "#fff" : primary}
        strokeColour = {isActive ? primary : "#fff"} />
);

Share.propTypes = {
  isSharing: PropTypes.bool,
  isActive: PropTypes.bool.isRequired,
  Icon: PropTypes.func.isRequired
};

Share.defaultProps = {
  isSharing: false
};

const makeShare = (Icon, isSharing = false) => props => ( 
  <Share Icon={Icon} isSharing={isSharing} {...props} />
);

const Save = ({isSaved, isSaving, isActive }) => (
  isSaving
    ? <ActivityIndicator />
    : (
    <IconStar
      fillColour={isActive || !isSaved ? "white" : primary}
      strokeColour={isActive ? "white" : primary}
    />
  )
);


Save.propTypes = {
  isSaved: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
};


const makeSave = (isSaved, isSaving) => props => ( 
  <Save 
    isSaved={isSaved} 
    isSaving={isSaving} {...props} />
);

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
          render={makeShare(IconEmail, isSharing)}
        />
        <Bubble onPress={onTwitter}  render={makeShare(IconTwitter)} />
        <Bubble onPress={onFacebook} render={makeShare(IconFacebook)} />
      </View>
      <View style={styles.group}>
        <Text style={styles.text}>{isSaved ? "Saved" : "Save"}</Text>
        <Bubble
          isLoading={isSaving}
          onPress={onSave}
          render={makeSave(isSaved, isSaving)}
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
