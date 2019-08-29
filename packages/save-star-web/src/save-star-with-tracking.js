/* eslint-env browser */
import React, { Component, Fragment } from "react";
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

/* eslint-disable jsx-a11y/anchor-is-valid */
class SaveStar extends Component {
  constructor(props) {
    super(props);
    this.onSaveButtonPress = this.onSaveButtonPress.bind(this);
  }

  onSaveButtonPress(e) {
    const { onSave, articleId, savedStatus } = this.props;

    e.preventDefault();
    onSave({ articleId, savedStatus });
  }

  renderSaveButton() {
    const { colour, hoverColour, savedStatus } = this.props;
    const { fillColour, strokeColour } = getStyles({ saveStatus: savedStatus });
    return (
      <Link onPress={this.onSaveButtonPress} responsiveLinkStyles={styles.link}>
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

  renderActivity() {
    const { isLoading } = this.props;

    if (isLoading) {
      return <ActivityIndicator size="small" style={styles.activityLoader} />;
    }

    return this.renderSaveButton();
  }

  render() {
    const { savedStatus } = this.props;
    return (
      <Fragment>
        <Text style={styles.label}>{savedStatus ? "Saved" : "Save"}</Text>
        {this.renderActivity()}
      </Fragment>
    );
  }
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
