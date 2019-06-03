/* eslint-env browser */
import React, { Component, Fragment } from "react";
import { ActivityIndicator, Text } from "react-native";
import Link from "@times-components/link";
import { HoverIcon } from "@times-components/utils";
import PropTypes from "prop-types";
import { IconStar } from "@times-components/icons";
import styles, { getStyles } from "./styles";
import withTrackEvents from "./tracking/with-track-events";

/* eslint-disable jsx-a11y/anchor-is-valid */
class SaveStarWeb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingState: null,
      savedStatus: false
    };
    this.onSaveButtonPress = this.onSaveButtonPress.bind(this);
    this.save = this.save.bind(this);
    this.renderSaveButton = this.renderSaveButton.bind(this);
  }

  componentDidMount() {
    const { articleId, saveApi } = this.props;

    this.getBookmarks(articleId, saveApi);
  }

  onSaveButtonPress(e) {
    const { onSaveButtonPress } = this.props;
    onSaveButtonPress(this.save, e);
  }

  getBookmarks(articleId, saveApi) {
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
            loadingState: false,
            savedStatus: !!savedArticles.find(item => item === articleId)
          });
        }
      })
      .catch(error => {
        this.setState({ loadingState: false, savedStatus: false });
        console.error(error);
      });
  }

  save() {
    this.setState({ loadingState: true });

    const { savedStatus } = this.state;
    const { articleId: id, saveApi } = this.props;

    const saveMethod = savedStatus ? saveApi.unBookmark : saveApi.bookmark;
    saveMethod(id)
      .then(() => {
        this.setState({
          loadingState: false,
          savedStatus: !savedStatus
        });
      })
      .catch(error => {
        this.setState({ loadingState: false, savedStatus });
        console.error("Error in connecting to api", error);
      });
  }

  renderSaveButton() {
    const { colour, hoverColour } = this.props;
    const { savedStatus } = this.state;
    const saveStyle = getStyles({ saveStatus: savedStatus });
    const { fillColour, strokeColour } = saveStyle;

    return (
      <Link onPress={this.onSaveButtonPress} responsiveLinkStyles={styles.link}>
        <HoverIcon colour={colour} hoverColour={hoverColour}>
          <IconStar
            fillColour={fillColour}
            strokeColour={strokeColour}
            title="Save to My Articles"
            height={18}
          />
        </HoverIcon>
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
    const { savedStatus } = this.state;

    return (
      <Fragment>
        <Text style={styles.label}>{savedStatus ? "Saved" : "Save  "}</Text>
        {this.renderActivity()}
      </Fragment>
    );
  }
}

SaveStarWeb.propTypes = {
  articleId: PropTypes.string.isRequired,
  colour: PropTypes.string,
  hoverColour: PropTypes.string,
  saveApi: PropTypes.shape({
    bookmark: PropTypes.func.isRequired,
    getBookmarks: PropTypes.func.isRequired,
    unBookmark: PropTypes.func.isRequired
  }).isRequired,
  onSaveButtonPress: PropTypes.func.isRequired
};

SaveStarWeb.defaultProps = {
  colour: styles.svgIcon.fillColour,
  hoverColour: styles.svgIcon.hoverFillColour
};

export default withTrackEvents(SaveStarWeb);
export { default as saveApi } from "./save-api";
