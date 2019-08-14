/* eslint-env browser */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./styles";
import SaveStarWithTracking from "./save-star-with-tracking";

/* eslint-disable jsx-a11y/anchor-is-valid */
class SaveStarWeb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedStatus: false
    };
    this.updateSavedStatus = this.updateSavedStatus.bind(this);
  }

  updateSavedStatus(savedStatus) {
    this.setState({
      savedStatus
    });
  }

  render() {
    const { savedStatus } = this.state;
    const {
      colour,
      hoverColour,
      articleId,
      saveApi,
      onSaveButtonPress
    } = this.props;

    return (
      <SaveStarWithTracking
        colour={colour}
        hoverColour={hoverColour}
        articleId={articleId}
        saveApi={saveApi}
        savedStatus={savedStatus}
        updateSavedStatus={this.updateSavedStatus}
        onSaveButtonPress={onSaveButtonPress}
      />
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

export default SaveStarWeb;
export { default as saveApi } from "./save-api";
