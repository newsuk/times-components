/* eslint-env browser */
import React from "react";
import PropTypes from "prop-types";
import styles from "./styles";
import SaveStarWithTracking from "./save-star-with-tracking";
import SaveAPI from "./save-api";

function SaveStarWeb({ colour, hoverColour, articleId }) {
  return (
    <SaveAPI articleId={articleId}>
      {({ isLoading, toggleSaved, savedStatus }) => (
        <SaveStarWithTracking
          colour={colour}
          hoverColour={hoverColour}
          articleId={articleId}
          savedStatus={savedStatus}
          onSave={toggleSaved}
          isLoading={isLoading}
        />
      )}
    </SaveAPI>
  );
}

SaveStarWeb.propTypes = {
  articleId: PropTypes.string.isRequired,
  colour: PropTypes.string,
  hoverColour: PropTypes.string
};

SaveStarWeb.defaultProps = {
  colour: styles.svgIcon.fillColour,
  hoverColour: styles.svgIcon.hoverFillColour
};

export default SaveStarWeb;
