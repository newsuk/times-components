import React from "react";
import PropTypes from "prop-types";
import { IconActivityIndicator } from "@times-components/icons";
import { Bookmark } from "@emotion-icons/bootstrap/Bookmark";
import { BookmarkFill } from "@emotion-icons/bootstrap/BookmarkFill";
import { IconActivityIndicatorContainer, StyledButton } from "../styled";

const SaveButton = props => {
  if (props.error || !props.data) return null;

  const { isBookmarked } = props.data;

  return (
    <>
      <StyledButton
        isLoading={props.isLoading}
        size="small"
        overrides={{ stylePreset: "buttonOutlinedPrimary" }}
        onClick={() =>
          props.onToggleSave(props.articleId, props.data.isBookmarked)
        }
      >
        {/* <IconActivityIndicatorContainer show={props.isLoading}>
          <IconActivityIndicator size="small" fillColor="#333333" />
        </IconActivityIndicatorContainer> */}

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

export default React.memo(SaveButton);
