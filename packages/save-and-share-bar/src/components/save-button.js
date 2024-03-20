import React from "react";
import PropTypes from "prop-types";
import { IconActivityIndicator } from "@times-components/icons";
import { IconActivityIndicatorContainer, StyledButton } from "../styled";
import { Bookmark } from "@emotion-icons/bootstrap/Bookmark";
import { BookmarkFill } from "@emotion-icons/bootstrap/BookmarkFill";

const SaveButton = props => {
  if (props.loading) {
    return (
      <StyledButton
        size="small"
        overrides={{ stylePreset: "buttonOutlinedPrimary" }}
      >
        <IconActivityIndicatorContainer>
          <IconActivityIndicator size="small" />
        </IconActivityIndicatorContainer>
        Save
      </StyledButton>
    );
  }

  if (props.error || !props.data) return null;

  const { isBookmarked } = props.data;

  return (
    <>
      <StyledButton
        size="small"
        overrides={{ stylePreset: "buttonOutlinedPrimary" }}
        onClick={() =>
          props.onToggleSave(props.articleId, props.data.isBookmarked)
        }
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
