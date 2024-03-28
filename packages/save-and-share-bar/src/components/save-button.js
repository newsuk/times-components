import React from "react";
import PropTypes from "prop-types";
import { IconActivityIndicator } from "@times-components/icons";
import { Bookmark } from "@emotion-icons/bootstrap/Bookmark";
import { BookmarkFill } from "@emotion-icons/bootstrap/BookmarkFill";
import { IconActivityIndicatorContainer, StyledButton } from "../styled";

const SaveButton = props => {
  const { loading, error, data, articleId, onToggleSave, onClick } = props;
  const handleClick = () => {
    onToggleSave(articleId, data.isBookmarked);
    if (onClick) {
      onClick();
    }
  };

  if (loading) {
    return (
      <StyledButton
        size="small"
        overrides={{ stylePreset: "buttonOutlinedPrimary" }}
      >
        <IconActivityIndicatorContainer>
          <IconActivityIndicator size="small" fillColor="#333333" />
        </IconActivityIndicatorContainer>
      </StyledButton>
    );
  }

  if (error || !data) return null;

  const { isBookmarked } = data;

  return (
    <>
      <StyledButton
        size="small"
        overrides={{ stylePreset: "buttonOutlinedPrimary" }}
        onClick={handleClick}
      >
        {!isBookmarked ? (
          <Bookmark style={{ height: 14, width: 14 }} />
        ) : (
          <BookmarkFill style={{ height: 14, width: 14 }} />
        )}
        {!isBookmarked ? "Save" : "Saved"}
      </StyledButton>
    </>
  );
};

SaveButton.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  data: PropTypes.shape({}),
  articleId: PropTypes.string,
  onToggleSave: PropTypes.func
};

export default SaveButton;
