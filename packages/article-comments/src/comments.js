/* eslint-env browser */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { CommentContainer } from "./styles/responsive";
import executeSSOtransaction from "./comment-login";
import withTrackEvents from "./tracking/with-track-events";
import { getDisplayNameFromLocalStorage, userShouldUpdateName } from "./utils";

class Comments extends Component {
  constructor() {
    super();
    this.container = null;
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
      isReadOnly,
      commentingConfig,
      onCommentStart,
      onCommentPost,
      onCommentNotification,
      onCommentFilterNewest,
      onCommentFilterMostRecommended,
      onCommentFilterOldest,
      onCommentReplyClick,
      onCommentShareLink,
      onCommentShareTwitter,
      onCommentShareEmail,
      onCommentShareFacebook,
      onCommentRecommend,
      onCommentNotificationClicked,
      onCommentUsernameClicked,
      onCommentSettingsClicked
    } = this.props;

    if (!this.container || !articleId || !commentingConfig) {
      return;
    }

    const getFilterEvent = event => {
      switch (event.detail.sortedBy) {
        case "best":
          return onCommentFilterMostRecommended(event);
        case "oldest":
          return onCommentFilterOldest(event);
        case "newest":
          return onCommentFilterNewest(event);
        default:
          return null;
      }
    };

    const getShareEvent = event => {
      switch (event.detail.type) {
        case "link":
          return onCommentShareLink(event);
        case "email":
          return onCommentShareEmail(event);
        case "twitter":
          return onCommentShareTwitter(event);
        case "facebook":
          return onCommentShareFacebook(event);
        default:
          return null;
      }
    };

    document.addEventListener(
      "spot-im-current-user-typing-start",
      async event => {
        onCommentStart(event);

        if (window.location.search.includes("enableRealNameCommenting")) {
          const displayName = getDisplayNameFromLocalStorage();
          if (!displayName) return;

          const shouldShowBanner = await userShouldUpdateName(displayName);
          if (shouldShowBanner) {
            window.dispatchEvent(
              new CustomEvent("SHOW_REAL_NAME_COMMENTING_BANNER", {})
            );
          }
        }
      },
      { once: true }
    );

    document.addEventListener(
      "spot-im-current-user-sent-message",
      onCommentPost
    );
    document.addEventListener(
      "spot-im-notification-drop-down-link",
      onCommentNotification
    );
    document.addEventListener("spot-im-user-up-vote-click", onCommentRecommend);
    document.addEventListener("spot-im-sort-by-select", event =>
      getFilterEvent(event)
    );
    document.addEventListener(
      "spot-im-user-clicked-reply",
      onCommentReplyClick
    );
    document.addEventListener(
      "spot-im-clicked-settings",
      onCommentSettingsClicked
    );
    document.addEventListener(
      "spot-im-user-notifications-click",
      onCommentNotificationClicked
    );
    document.addEventListener(
      "spot-im-open-user-profile",
      onCommentUsernameClicked
    );
    document.addEventListener("spot-im-share-type", event =>
      getShareEvent(event)
    );

    if (!isReadOnly) {
      if (window.SPOTIM && window.SPOTIM.startSSO) {
        executeSSOtransaction();
      } else {
        document.addEventListener("spot-im-api-ready", () => {
          executeSSOtransaction();
        });
      }
    }

    const launcherScript = document.createElement("script");
    launcherScript.setAttribute("async", "async");
    launcherScript.setAttribute(
      "src",
      `https://launcher.spot.im/spot/${commentingConfig.account}`
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
      onCommentShareLink,
      onCommentShareTwitter,
      onCommentShareEmail,
      onCommentShareFacebook,
      onCommentRecommend,
      onCommentNotificationClicked,
      onCommentUsernameClicked,
      onCommentSettingsClicked
    } = this.props;

    return (
      <CommentContainer
        id="comments-container"
        onCommentStart={onCommentStart}
        onCommentPost={onCommentPost}
        onCommentNotification={onCommentNotification}
        onCommentReplyClick={onCommentReplyClick}
        onCommentFilterNewest={onCommentFilterNewest}
        onCommentFilterMostRecommended={onCommentFilterMostRecommended}
        onCommentFilterOldest={onCommentFilterOldest}
        onCommentShareLink={onCommentShareLink}
        onCommentShareTwitter={onCommentShareTwitter}
        onCommentShareEmail={onCommentShareEmail}
        onCommentShareFacebook={onCommentShareFacebook}
        onCommentRecommend={onCommentRecommend}
        onCommentNotificationClicked={onCommentNotificationClicked}
        onCommentUsernameClicked={onCommentUsernameClicked}
        onCommentSettingsClicked={onCommentSettingsClicked}
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
  commentingConfig: PropTypes.shape({
    account: PropTypes.string.isRequired
  }).isRequired,
  onCommentStart: PropTypes.func,
  onCommentPost: PropTypes.func,
  onCommentNotification: PropTypes.func,
  onCommentFilterNewest: PropTypes.func,
  onCommentFilterMostRecommended: PropTypes.func,
  onCommentFilterOldest: PropTypes.func,
  onCommentReplyClick: PropTypes.func,
  onCommentShareLink: PropTypes.func,
  onCommentShareTwitter: PropTypes.func,
  onCommentShareEmail: PropTypes.func,
  onCommentShareFacebook: PropTypes.func,
  onCommentRecommend: PropTypes.func,
  onCommentNotificationClicked: PropTypes.func,
  onCommentUsernameClicked: PropTypes.func,
  onCommentSettingsClicked: PropTypes.func
};

// onCommentStart and onCommentPost are added as props in order to allow this events to be tracked by analytics.
Comments.defaultProps = {
  onCommentStart: () => {},
  onCommentPost: () => {},
  onCommentNotification: () => {},
  onCommentReplyClick: () => {},
  onCommentFilterNewest: () => {},
  onCommentFilterMostRecommended: () => {},
  onCommentFilterOldest: () => {},
  onCommentShareLink: () => {},
  onCommentShareTwitter: () => {},
  onCommentShareEmail: () => {},
  onCommentShareFacebook: () => {},
  onCommentRecommend: () => {},
  onCommentNotificationClicked: () => {},
  onCommentUsernameClicked: () => {},
  onCommentSettingsClicked: () => {}
};

export default withTrackEvents(Comments);
