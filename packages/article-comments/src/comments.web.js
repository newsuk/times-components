/* eslint-env browser */

import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  CommentContainer,
} from "./styles/responsive";
import withTrackEvents from "./tracking/with-track-events";

class Comments extends Component {
  constructor() {
    super();
    this.container = null;
    this.state = {
      showLabel: false
    };
  }

  componentDidMount() {
    this.initialiseComments();
  }

  componentWillUnmount() {
    this.disposeComments();
  }

  initialiseComments() {
    const {
      articleId,
      spotAccountId,
      onCommentStart,
      onCommentPost,
      onCommentNotification,
      onCommentFilterNewest,
      onCommentFilterMostRecommended,
      onCommentFilterOldest,
      onCommentReplyClick,
      onCommentSettingsClick,
      onCommentShareLink,
      onCommentShareTwitter,
      onCommentShareEmail,
      onCommentShareFacebook
    } = this.props;

    if (!this.container || !articleId || !spotAccountId) {
      return;
    }

    const launcherScript = document.createElement("script");
    launcherScript.setAttribute("async", "async");
    launcherScript.setAttribute(
      "src",
      `https://launcher.spot.im/spot/${spotAccountId}`
    );
    launcherScript.setAttribute("data-spotim-module", "spotim-launcher");
    launcherScript.setAttribute("data-post-id", articleId);
    launcherScript.setAttribute(
      "data-post-url",
      `https://www.thetimes.co.uk/article/${articleId}`
    );
    launcherScript.setAttribute("data-seo-enabled", true);
    launcherScript.setAttribute("data-livefyre-url", articleId);
    this.container.appendChild(launcherScript);

    document.addEventListener(
      "spot-im-current-user-typing-start",
      onCommentStart,
      {
        once: true
      }
    );
    document.addEventListener(
      "spot-im-current-user-sent-message",
      onCommentPost
    );
    document.addEventListener(
      "spot-im-notification-drop-down-link",
      onCommentNotification
    );
    document.addEventListener(
      "spot-im-sort-by-select",
      function(event) {
        switch (event.detail.sortedBy) {
          case 'best':
            onCommentFilterMostRecommended;
          case 'oldest':
            onCommentFilterOldest;
          case 'newest':
            onCommentFilterNewest
          default:
            break;
        }
      }
    );
    document.addEventListener(
      "spot-im-user-clicked-reply",
      onCommentReplyClick
    );
    document.addEventListener(
      "spot-im-clicked-settings",
      onCommentSettingsClick
    );
    document.addEventListener(
      "spot-im-share-type",
      function(event) {
        switch(event.detail.type) {
          case 'link':
            onCommentShareLink;
          case 'email':
            onCommentShareEmail;
          case 'twitter':
            onCommentShareTwitter;
          case 'facebook':
            onCommentShareFacebook;
          default:
            break;
        }
      }
    );
  }

  disposeComments() {
    if (this.container) {
      this.container.innerHTML = "";
    }
  }

  render() {
    const { 
      onCommentStart, 
      onCommentPost, 
      onCommentNotification,
      onCommentFilterNewest,
      onCommentFilterMostRecommended,
      onCommentFilterOldest,
      onCommentReplyClick,
      onCommentSettingsClick,
      onCommentShareLink,
      onCommentShareTwitter,
      onCommentShareEmail,
      onCommentShareFacebook
    } = this.props;

    return (
      <CommentContainer
        id="comments-container"
        onCommentStart={onCommentStart}
        onCommentPost={onCommentPost}
        onCommentNotification={onCommentNotification}
        onCommentNotification={onCommentNotification}
        onCommentReplyClick={onCommentReplyClick}
        onCommentSettingsClick={onCommentSettingsClick}
        onCommentFilterNewest={onCommentFilterNewest}
        onCommentFilterMostRecommended={onCommentFilterMostRecommended}
        onCommentFilterOldest={onCommentFilterOldest}
        onCommentShareLink={onCommentShareLink}
        onCommentShareTwitter={onCommentShareTwitter}
        onCommentShareEmail={onCommentShareEmail}
        onCommentShareFacebook={onCommentShareFacebook}
      >
        <div
          ref={el => {
            this.container = el;
          }}
        /> 
      </CommentContainer>
    );
  }
}

Comments.propTypes = {
  articleId: PropTypes.string.isRequired,
  isReadOnly: PropTypes.bool.isRequired,
  spotAccountId: PropTypes.string.isRequired,
  onCommentStart: PropTypes.func,
  onCommentPost: PropTypes.func,
  onCommentNotification: PropTypes.func,
  onCommentFilterNewest: PropTypes.func,
  onCommentFilterMostRecommended: PropTypes.func,
  onCommentFilterOldest: PropTypes.func,
  onCommentReplyClick: PropTypes.func,
  onCommentSettingsClick: PropTypes.func,
  onCommentShareLink: PropTypes.func,
  onCommentShareTwitter: PropTypes.func,
  onCommentShareEmail: PropTypes.func,
  onCommentShareFacebook: PropTypes.func
};

// onCommentStart and onCommentPost are added as props in order to allow this events to be tracked by analytics.
Comments.defaultProps = {
  onCommentStart: () => {},
  onCommentPost: () => {},
  onCommentNotification: () => {},
  onCommentReplyClick: () => {},
  onCommentSettingsClick: () => {},
  onCommentFilterNewest: () => {},
  onCommentFilterMostRecommended: () => {},
  onCommentFilterOldest: () => {},
  onCommentShareLink: () => {},
  onCommentShareTwitter: () => {},
  onCommentShareEmail: () => {},
  onCommentShareFacebook: () => {}
};

export default withTrackEvents(Comments);
