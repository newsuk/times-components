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
    this.saveUnsaveBookmark = this.saveUnsaveBookmark.bind(this);
    this.onLinkPress = this.onLinkPress.bind(this);
  }

  componentDidMount() {
    const { articleId, saveApi } = this.props;

    this.getBookmarks(articleId, saveApi);
  }

  onLinkPress(evt) {
    const { onSaveButtonPress } = this.props;
    const { savedStatus } = this.state;
    onSaveButtonPress(evt, savedStatus, this.saveUnsaveBookmark);
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

  saveUnsaveBookmark(saveMethod, successStatus, errorStatus) {
    this.setState({ loadingState: true });
    const { articleId: id } = this.props;
    saveMethod(id)
      .then(() => {
        this.setState({
          loadingState: false,
          savedStatus: successStatus
        });
      })
      .catch(error => {
        this.setState({ loadingState: false, savedStatus: errorStatus });
        console.error("Error in connecting to api", error);
      });
  }

  renderSaveButton() {
    const { colour, hoverColour, height = 18 } = this.props;
    const { savedStatus } = this.state;
    const saveStyle = getStyles({ saveStatus: savedStatus });
    const { fillColour, strokeColour } = saveStyle;

    return (
      <Link onPress={this.onLinkPress} responsiveLinkStyles={styles.link}>
        <HoverIcon colour={colour} hoverColour={hoverColour}>
          <IconStar
            fillColour={fillColour}
            strokeColour={strokeColour}
            title="Save to My Articles"
            height={height}
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
    const activity = this.renderActivity();

    return (
      <Fragment>
        <Text style={styles.label}>{savedStatus ? "Saved" : "Save  "}</Text>
        {activity}
      </Fragment>
    );
  }
}

SaveStarWeb.propTypes = {
  articleId: PropTypes.string.isRequired,
  colour: PropTypes.string,
  hoverColour: PropTypes.string,
  height: PropTypes.number.isRequired,
  saveApi: PropTypes.shape({
    bookmark: PropTypes.func.isRequired,
    getBookmarks: PropTypes.func.isRequired,
    unBookmark: PropTypes.func.isRequired
  }).isRequired,
  onSaveButtonPress: PropTypes.func
};

SaveStarWeb.defaultProps = {
  colour: styles.svgIcon.fillColour,
  hoverColour: styles.svgIcon.hoverFillColour,
  onSaveButtonPress: () => {}
};

export default withTrackEvents(SaveStarWeb);
export { default as saveApi } from "./save-api";
