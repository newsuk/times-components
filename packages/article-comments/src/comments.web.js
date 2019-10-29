/* eslint-env browser */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextLink } from "@times-components/link";
import {
  CommentContainer,
  CommentEnabledGuidelines
} from "./styles/responsive";
import executeSSOtransaction from "./comment-login";
import styles from "./styles";
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
      isReadOnly,
      spotAccountId,
      onCommentStart,
      onCommentPost
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
      onCommentStart
    );
    document.addEventListener(
      "spot-im-current-user-sent-message",
      onCommentPost
    );

    if (!isReadOnly) {
      if (window.SPOTIM && window.SPOTIM.startSSO) {
        executeSSOtransaction(() => {
          this.setState({
            showLabel: true
          });
        });
      } else {
        document.addEventListener("spot-im-api-ready", () =>
          executeSSOtransaction(() => {
            this.setState({
              showLabel: true
            });
          })
        );
      }
    }
  }

  disposeComments() {
    if (this.container) {
      this.container.innerHTML = "";
    }
  }

  render() {
    const { showLabel } = this.state;
    const { onCommentStart, onCommentPost } = this.props;

    return (
      <CommentContainer
        id="comments-container"
        onCommentStart={onCommentStart}
        onCommentPost={onCommentPost}
      >
        {showLabel ? (
          <CommentEnabledGuidelines>
            Comments are subject to our community guidelines, which can be
            viewed{" "}
            <TextLink
              style={styles.link}
              url="https://www.thetimes.co.uk/article/f4024fbe-d989-11e6-9063-500e6740fc32"
            >
              here
            </TextLink>
            .
          </CommentEnabledGuidelines>
        ) : null}

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
  onCommentPost: PropTypes.func
};

// onCommentStart and onCommentPost are added as props in order to allow this events to be tracked by analytics.
Comments.defaultProps = {
  onCommentStart: () => {},
  onCommentPost: () => {}
};

export default withTrackEvents(Comments);
