/* eslint-env browser */
import React, { Component, Fragment } from "react";
import { ActivityIndicator, Text } from "react-native";
import Link from "@times-components/link";
import styled from "styled-components";
import PropTypes from "prop-types";
import { IconSaveBookmark } from "@times-components/icons";
import styles, { getStyles } from "./styles";

const HoverIcon =
  styled.div &&
  styled.div`
    color: ${props => props.colour};
    &:hover {
      color: ${props => props.hoverColour || props.colour};
    }
  `;

class SaveStarWeb extends Component {
  constructor(props) {
    super(props);
    this.onSaveButtonPress = this.onSaveButtonPress.bind(this);
    this.state = {
      loadingState: null,
      savedStatus: false
    };
  }

  async componentDidMount() {
    const { articleId, saveApi } = this.props;

    this.setState({ loadingState: typeof window !== "undefined" });

    await this.getBookmarks(articleId, saveApi);
  }

  onSaveButtonPress(evt) {
    evt.preventDefault();

    const { savedStatus } = this.state;
    const { saveApi } = this.props;

    if (savedStatus) {
      this.saveUnsaveBookmark(saveApi.bookmark, false, true);
    } else {
      this.saveUnsaveBookmark(saveApi.unBookmark, true, false);
    }
  }

  async getBookmarks(articleId, saveApi) {
    try {
      const response = await saveApi.getBookmarks();
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
    } catch (error) {
      this.setState({ loadingState: false, savedStatus: false });
      console.error("Error in connecting to api", error);
    }
  }

  async saveUnsaveBookmark(saveMethod, successStatus, errorStatus) {
    this.setState({ loadingState: true });
    const { articleId: id } = this.props;

    try {
      await saveMethod(id);
      this.setState({
        loadingState: false,
        savedStatus: successStatus
      });
    } catch (error) {
      this.setState({ loadingState: false, savedStatus: errorStatus });
      console.error("Error in connecting to api", error);
    }
  }

  renderSaveButton(saveStatus) {
    const { colour, hoverColour } = this.props;

    const saveStyle = getStyles({ saveStatus });
    const { fillColour, strokeColour } = saveStyle;
    /* eslint-disable jsx-a11y/anchor-is-valid */

    return (
      <Link onPress={this.onSaveButtonPress} responsiveLinkStyles={styles.link}>
        <HoverIcon colour={colour} hoverColour={hoverColour}>
          <IconSaveBookmark
            fillColour={fillColour}
            strokeColour={strokeColour}
            title="Save to My Articles"
          />
        </HoverIcon>
      </Link>
    );
  }

  renderActivity() {
    const { savedStatus, loadingState } = this.state;

    if (loadingState) {
      return <ActivityIndicator size="small" style={styles.activityLoader} />;
    }

    return this.renderSaveButton(!!savedStatus);
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
  saveApi: PropTypes.func.isRequired
};

SaveStarWeb.defaultProps = {
  colour: styles.svgIcon.fillColour,
  hoverColour: styles.svgIcon.hoverFillColour
};

export default SaveStarWeb;
