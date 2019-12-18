/* eslint-env browser */
import React, { Fragment } from "react";
import { ActivityIndicator, Text } from "react-native";
import styled from "styled-components";
import Link from "@times-components/link";
import { HoverIcon } from "@times-components/utils";
import PropTypes from "prop-types";
import { IconStar } from "@times-components/icons";
import styles, { getStyles } from "./styles";
import withTrackEvents from "./tracking/with-track-events";

const IconContainer = styled(HoverIcon)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function SaveStar({
  onSave,
  articleId,
  savedStatus,
  colour,
  hoverColour,
  isLoading
}) {
  function onSaveButtonPress(e) {
    e.preventDefault();
    onSave({ articleId, savedStatus });
  }

  function renderSaveButton() {
    const { fillColour, strokeColour } = getStyles({ saveStatus: savedStatus });
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link
        onPress={onSaveButtonPress}
        responsiveLinkStyles={styles.link}
        url=""
      >
        <IconContainer colour={colour} hoverColour={hoverColour}>
          <IconStar
            fillColour={fillColour}
            strokeColour={strokeColour}
            title={
              savedStatus ? "Remove from My Articles" : "Save to My Articles"
            }
            height={18}
          />
        </IconContainer>
      </Link>
    );
  }

  function renderActivity() {
    if (isLoading) {
      return <ActivityIndicator size="small" style={styles.activityLoader} />;
    }

    return renderSaveButton();
  }

  return (
    <Fragment>
      <Text style={styles.label}>{savedStatus ? "Saved" : "Save"}</Text>
      {renderActivity()}
    </Fragment>
  );
}

SaveStar.propTypes = {
  articleId: PropTypes.string.isRequired,
  colour: PropTypes.string,
  hoverColour: PropTypes.string,
  savedStatus: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

SaveStar.defaultProps = {
  colour: styles.svgIcon.fillColour,
  hoverColour: styles.svgIcon.hoverFillColour
};

export default withTrackEvents(SaveStar);
