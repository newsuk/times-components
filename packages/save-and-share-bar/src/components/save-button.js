import React from "react";
import PropTypes from "prop-types";
import { IconActivityIndicator } from "@times-components/icons";
import { IconActivityIndicatorContainer, StyledButton } from "../styled";
import {
  NewsKitBookmarkOutlineIcon,
  NewsKitBookmarkFilledIcon
} from "../assets";

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
          <NewsKitBookmarkOutlineIcon />
        ) : (
          <NewsKitBookmarkFilledIcon />
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
