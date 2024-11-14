import React from "react";
import PropTypes from "prop-types";
import { IconActivityIndicator } from "@times-components/icons";
import { IconActivityIndicatorContainer, OutlineButton } from "../styled";
import BookmarkIcon from "../assets/bookmark-icon";
import BookmarkFillIcon from "../assets/bookmark-fill-icon";

const SaveButton = props => {
  if (props.error || (!props.loading && !props.data)) return null;

  const { isBookmarked } = props.data || { isBookmarked: false };

  const iconStyles = {
    height: 14,
    width: 14,
    visibility: props.loading ? "hidden" : "visible"
  };

  const buttonText = isBookmarked ? "Saved" : "Save";

  return (
    <>
      <OutlineButton
        isLoading={props.loading}
        onClick={() => {
          if (!isBookmarked) {
            props.onSaveToMyArticles();
          } else {
            props.onRemoveFromMyArticles();
          }
          props.onToggleSave(props.articleId, props.data.isBookmarked);
        }}
      >
        {props.loading && (
          <IconActivityIndicatorContainer>
            <IconActivityIndicator />
          </IconActivityIndicatorContainer>
        )}
        {!isBookmarked ? (
          <BookmarkIcon
            height={iconStyles.height}
            width={iconStyles.width}
            visibility={iconStyles.visibility}
          />
        ) : (
          <BookmarkFillIcon
            height={iconStyles.height}
            width={iconStyles.width}
            visibility={iconStyles.visibility}
          />
        )}
        {!props.loading ? buttonText : ""}
      </OutlineButton>
    </>
  );
};

SaveButton.propTypes = {
  onSaveToMyArticles: PropTypes.func,
  onRemoveFromMyArticles: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  data: PropTypes.shape({}),
  articleId: PropTypes.string,
  onToggleSave: PropTypes.func
};

export default React.memo(SaveButton);
