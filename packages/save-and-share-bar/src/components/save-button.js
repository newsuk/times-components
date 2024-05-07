import React from "react";
import PropTypes from "prop-types";
import { IconActivityIndicator } from "@times-components/icons";
import { Bookmark } from "@emotion-icons/bootstrap/Bookmark";
import { BookmarkFill } from "@emotion-icons/bootstrap/BookmarkFill";
import { IconActivityIndicatorContainer, OutlineButton } from "../styled";

const SaveButton = props => {
  if (props.error || (!props.loading && !props.data)) return null;

  const { isBookmarked } = props.data || { isBookmarked: false };

  const bookmarkIconStyles = {
    height: 14,
    width: 14,
    visibility: props.loading ? "hidden" : "visible"
  };

  const buttonText = isBookmarked ? "Saved" : "Save";
  return (
    <>
      <OutlineButton
        onClick={() =>
          props.onToggleSave(props.articleId, props.data.isBookmarked)
        }
      >
        {props.loading && (
          <IconActivityIndicatorContainer>
            <IconActivityIndicator />
          </IconActivityIndicatorContainer>
        )}
        {!isBookmarked ? (
          <Bookmark style={bookmarkIconStyles} />
        ) : (
          <BookmarkFill style={bookmarkIconStyles} />
        )}
        {!props.loading ? buttonText : ""}
      </OutlineButton>
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
