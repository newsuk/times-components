/* eslint-env browser */

import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  CommentContainer,
  CommentEnabledGuidelines
} from "./styles/responsive";
import executeSSOtransaction from "./comment-login";

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
    const { articleId, isReadOnly, spotAccountId } = this.props;

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

    if (!isReadOnly) {
      if (window.SPOTIM && window.SPOTIM.startSSO) {
        executeSSOtransaction();
      } else {
        document.addEventListener("spot-im-api-ready", executeSSOtransaction);
      }
    }
  }

  disposeComments() {
    if (this.container) {
      this.container.innerHTML = "";
    }
  }

  render() {
    return (
      <CommentContainer>
        <CommentEnabledGuidelines>
          Comments are subject to our community guidelines, which can be viewed{" "}
          <a href="//www.thetimes.co.uk/article/f4024fbe-d989-11e6-9063-500e6740fc32">
            here
          </a>
          .
        </CommentEnabledGuidelines>
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
  spotAccountId: PropTypes.string.isRequired
};

export default Comments;
