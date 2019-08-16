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
    this.state = {
      loadingState: null
    };
    this.onSaveButtonPress = this.onSaveButtonPress.bind(this);
    this.save = this.save.bind(this);
    this.renderSaveButton = this.renderSaveButton.bind(this);
  }

  componentDidMount() {
    const { articleId, saveApi, updateSavedStatus } = this.props;

    this.getBookmarks(articleId, saveApi, updateSavedStatus);
  }

  onSaveButtonPress(e) {
    const { onSaveButtonPress } = this.props;
    onSaveButtonPress(this.save, e);
  }

  getBookmarks(articleId, saveApi, updateSavedStatus) {
    saveApi
      .getBookmarks()
      .then(response => {
        const { loading, data } = response;
        if (loading) {
          this.setState({ loadingState: true });
        } else {
          const savedArticles = data.viewer.bookmarks.bookmarks.map(
            item => item.id
          );

          this.setState({
            loadingState: false
          });
          updateSavedStatus(!!savedArticles.find(item => item === articleId));
        }
      })
      .catch(error => {
        this.setState({ loadingState: false });
        updateSavedStatus(false);
        console.error(error);
      });
  }

  save() {
    this.setState({ loadingState: true });

    const {
      articleId: id,
      saveApi,
      savedStatus,
      updateSavedStatus
    } = this.props;

    const saveMethod = savedStatus ? saveApi.unBookmark : saveApi.bookmark;
    saveMethod(id)
      .then(() => {
        this.setState({
          loadingState: false
        });
        updateSavedStatus(!savedStatus);
      })
      .catch(error => {
        this.setState({ loadingState: false });
        updateSavedStatus(savedStatus);
        console.error("Error in connecting to api", error);
      });
  }

  renderSaveButton() {
    const { colour, hoverColour, savedStatus } = this.props;
    const saveStyle = getStyles({ saveStatus: savedStatus });
    const { fillColour, strokeColour } = saveStyle;
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
    const { loadingState } = this.state;

    if (loadingState) {
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
  saveApi: PropTypes.shape({
    bookmark: PropTypes.func.isRequired,
    getBookmarks: PropTypes.func.isRequired,
    unBookmark: PropTypes.func.isRequired
  }).isRequired,
  savedStatus: PropTypes.bool.isRequired,
  onSaveButtonPress: PropTypes.func.isRequired,
  updateSavedStatus: PropTypes.func.isRequired
};

SaveStar.defaultProps = {
  colour: styles.svgIcon.fillColour,
  hoverColour: styles.svgIcon.hoverFillColour
};

export default withTrackEvents(SaveStar);
