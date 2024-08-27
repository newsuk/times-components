/* eslint-env browser */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { getDomainSpecificUrl } from "@times-components/utils";
import { IconEmail, IconActivityIndicator } from "@times-components/icons";
import { ShareItem, ShareItemLabel } from "./share-item";
import { EmailSpinnerContainer } from "../styled";
import styles from "../styles";

class EmailShare extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
    this.onShare = this.onShare.bind(this);
  }

  onShare(e) {
    const {
      articleId,
      getTokenisedShareUrl,
      shouldTokenise,
      articleUrl,
      onShareEmail,
      articleHeadline,
      hostName
    } = this.props;

    e.preventDefault();

    onShareEmail({ articleId, articleUrl, articleHeadline });

    if (shouldTokenise) {
      this.setState({ isLoading: true });

      getTokenisedShareUrl(articleId)
        .then(res => {
          const { data } = res;
          if (data && data.article) {
            this.setState({ isLoading: false });
            let tokenisedUrl = data.article.tokenisedUrl;

            if (data.article.categoryPath) {
              const { search: token } = new URL(data.article.tokenisedUrl);
              tokenisedUrl = `${hostName}${data.article.categoryPath}${token}`;
            }
            this.openMailClient(getDomainSpecificUrl(hostName, tokenisedUrl));
          }
        })
        .catch(() => {
          this.setState({ isLoading: false });
        });
    } else {
      const matches = window.location.search.match(/[?&]shareToken=([^&]+)/);
      this.openMailClient(
        matches ? `${articleUrl}?shareToken=${matches[1]}` : articleUrl
      );
    }
  }

  openMailClient(url) {
    const { articleHeadline, publicationName } = this.props;
    const publication =
      publicationName !== "TIMES" ? "The Sunday Times" : "The Times";

    const mailtoEmailUrl = `mailto:?subject=${articleHeadline} from ${publication}&body=I thought you would be interested in this story from ${publication}%0A%0A${articleHeadline}%0A%0A${url}`;

    window.location.assign(mailtoEmailUrl);
  }

  render() {
    const { isLoading } = this.state;

    return (
      <ShareItem
        tooltipContent="Share by email"
        onClick={this.onShare}
        testId="email-share"
      >
        <ShareItemLabel
          icon={
            isLoading ? (
              <EmailSpinnerContainer>
                <IconActivityIndicator size="small" />
              </EmailSpinnerContainer>
            ) : (
              <IconEmail
                ariaLabel=""
                fillColour="currentColor"
                height={styles.svgIcon.height}
                title="Share by email"
              />
            )
          }
        >
          Email
        </ShareItemLabel>
      </ShareItem>
    );
  }
}

EmailShare.propTypes = {
  getTokenisedShareUrl: PropTypes.func.isRequired,
  onShareEmail: PropTypes.func.isRequired,
  articleUrl: PropTypes.string.isRequired,
  articleHeadline: PropTypes.string.isRequired,
  articleId: PropTypes.string.isRequired,
  shouldTokenise: PropTypes.bool.isRequired,
  publicationName: PropTypes.string,
  hostName: PropTypes.string.isRequired
};

EmailShare.defaultProps = {
  publicationName: "TIMES"
};

export default EmailShare;
