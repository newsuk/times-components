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
    // eslint-disable-next-line no-console
    console.log("tu je on");

    onShareEmail({ articleId, articleUrl, articleHeadline });

    if (shouldTokenise) {
      this.setState({ isLoading: true });
      // eslint-disable-next-line no-console
      console.log("before shouldTokenise");

      getTokenisedShareUrl(articleId)
        .then(res => {
          const { data } = res;
          // eslint-disable-next-line no-console
          console.log(data.article, "Article data 1");
          if (data && data.article) {
            this.setState({ isLoading: false });
            try {
              // eslint-disable-next-line no-console
              console.log(data.article, "Article data");
              let { tokenisedUrl } = data.article;
              // eslint-disable-next-line no-console
              console.log(tokenisedUrl, "tokenisedUrl");
              const { categoryPath } = data.article;
              // eslint-disable-next-line no-console
              console.log(categoryPath, "categoryPath");
              if (categoryPath) {
                const { search: token } = new URL(tokenisedUrl);
                // eslint-disable-next-line no-console
                console.log(token, "search-token");
                tokenisedUrl = `${hostName}${categoryPath}${token}`;
              }
              this.openMailClient(getDomainSpecificUrl(hostName, tokenisedUrl));
            } catch (err) {
              // eslint-disable-next-line no-console
              console.log(err, "Email share error");
            }
          }
        })
        .catch((err) => {
          this.setState({ isLoading: false });
          // eslint-disable-next-line no-console
          console.log(err, "Email share error 2");
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
