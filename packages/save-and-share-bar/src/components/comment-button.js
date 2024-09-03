import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { IconActivityIndicator } from "@times-components/icons";
import {
  IconActivityIndicatorContainer,
  OutlineButton,
  CommentsLink
} from "../styled";
import CommentIcon from "../assets/comment-icon";

const CommentButton = ({ commentCount }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [showCommentButton, setShowCommentButton] = React.useState(false);

  useEffect(
    () => {
      if (window.sessionStorage.getItem("showCommentButton") === "true") {
        if (commentCount && commentCount > 30) {
          setShowCommentButton(true);
        }
      }
      // Arbitrary loading time to allow iframe to load before allowing
      setTimeout(() => setIsLoading(false), 3000);
    },
    [commentCount]
  );

  if (!showCommentButton) {
    return null;
  }

  return (
    <CommentsLink
      href="#comments-container"
      isLoading={isLoading}
      onClick={e => {
        e.preventDefault();
        const commentsContainer = document.getElementById("comments-container");
        if (commentsContainer) {
          commentsContainer.scrollIntoView({
            behavior: "smooth"
          });
        }
      }}
    >
      <OutlineButton isLoading={isLoading}>
        {isLoading && (
          <IconActivityIndicatorContainer>
            <IconActivityIndicator />
          </IconActivityIndicatorContainer>
        )}
        <div className="content">
          <CommentIcon height={14} width={14} />
          <span>Comment</span>
          <span>{commentCount.toLocaleString()}</span>
        </div>
      </OutlineButton>
    </CommentsLink>
  );
};

CommentButton.propTypes = {
  commentCount: PropTypes.number.isRequired
};

export default React.memo(CommentButton);
