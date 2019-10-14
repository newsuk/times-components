import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import UserState from "@times-components/user-state";
import SaveStar from "@times-components/save-star-web";
import styles from "./styles";

function SaveStarIcon({ articleId }) {
  return (
    <UserState state={UserState.loggedIn} serverRender={false}>
      <View style={styles.rowItem}>
        <SaveStar
          colour={styles.svgIcon.save.strokeColour}
          hoverColor={styles.svgIcon.hoverFillColour}
          articleId={articleId}
          height={styles.svgIcon.star.height}
        />
      </View>
    </UserState>
  );
}

SaveStarIcon.propTypes = {
  articleId: PropTypes.string.isRequired
};

export default SaveStarIcon;
